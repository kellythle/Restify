from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer, SerializerMethodField, ImageField

import re
from .models import avatarImage, CustomUser, avatarImage

from django.core.exceptions import ObjectDoesNotExist

from .models import avatarImage


User = get_user_model()


# class RegisterImageSerializer(serializers.ModelSerializer):
#     image_url = SerializerMethodField('get_image_url')

#     class Meta:
#         model = avatarImage
#         fields = ['id', 'image', 'image_url']

#     def get_image_url(self, obj):
#         request = self.context.get("request")
#         print("Here is the request: ", request)
#         print("Here is the obj: ", obj)
#         image_url = SerializerMethodField('get_image_url')
#         print(image_url)
#         if obj.image:  # Add this conditional check
#             return request.build_absolute_uri(obj.image.url)
#         else:
#             return None



class RegisterSerializer(serializers.ModelSerializer):
    avatar_file = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'password', 'first_name', 'last_name', 'email',
            'isHost', 'phone_number', 'avatar_file'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        try:
            avatar_obj = instance.avatar.all().first()
            if avatar_obj:
                request = self.context.get("request")
                ret['avatar'] = request.build_absolute_uri(avatar_obj.image.url)
            else:
                ret['avatar'] = None
        except ObjectDoesNotExist:
            ret['avatar'] = None
        return ret


    def validate_phone_number(self, phone_number):
        # Add your phone number validation logic here
        if not phone_number:
            return None

        # Check if the phone number is in the proper format
        regex = r'^\+?[1-9]\d{1,14}$'
        if not re.match(regex, phone_number):
            raise ValidationError('Invalid phone number format.')

        return phone_number

    def create(self, validated_data):
        errors = {}
        username = validated_data.get('username')
        if username is None:
            errors["username"] = "This field is required."

        password = validated_data.get('password')
        if password is None:
            errors["password"] = "This field is required."

        email = validated_data.get('email')
        if email is None:
            errors["email"] = "This field is required."

        first_name = validated_data.get('first_name')
        if first_name is None:
            errors["first_name"] = "This field is required."

        last_name = validated_data.get('last_name')
        if last_name is None:
            errors["last_name"] = "This field is required."

        isHost = validated_data.get('isHost')
        if isHost is None:
            errors["isHost"] = "This field is required."

        phone_number = validated_data.get('phone_number')


        if errors:
            raise ValidationError(errors)
        

        avatar = validated_data.pop('avatar_file', None)

        user = CustomUser.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
            isHost=isHost,
            phone_number=phone_number,
        )

        if avatar:
            avatar_obj = avatarImage.objects.create(user=user, image=avatar)
            user.avatar.add(avatar_obj)

        return user
        

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'email', 'avatar', 'phone_number', 'isHost')
        extra_kwargs = {
            'username': {'read_only': True}
        }

    def get_avatar(self, obj):
        try:
            avatar_obj = obj.avatar.first()  # Get the first AvatarImage related to the user
            if avatar_obj:
                request = self.context.get("request")
                return request.build_absolute_uri(avatar_obj.image.url)
            else:
                return None
        except ObjectDoesNotExist:
            return None

