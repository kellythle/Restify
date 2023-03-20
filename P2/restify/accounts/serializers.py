from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer, SerializerMethodField, ImageField

import re
from .models import avatarImage, CustomUser, UserAvatar

from django.core.exceptions import ObjectDoesNotExist

from .models import avatarImage, UserAvatar



User = get_user_model()

class RegisterImageSerializer(serializers.ModelSerializer):
    image_url = SerializerMethodField('get_image_url')

    class Meta:
        model = avatarImage
        fields = ['id', 'image', 'image_url']  

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)
    

class RegisterSerializer(serializers.ModelSerializer):
    avatar = RegisterImageSerializer(required=False)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'isHost', 'avatar', 'phone_number')
        extra_kwargs = {'password': {'write_only': True}}

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

        avatar_data = validated_data.pop('avatar', None)

        if errors:
            raise ValidationError(errors)

        user = CustomUser.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
            isHost=isHost,
            phone_number=phone_number,
        )

        if avatar_data:
            avatar = avatarImage.objects.create(**avatar_data)
            avatar.users.add(user)

        return user

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'avatar', 'phone_number', 'isHost')
        extra_kwargs = {
            'username': {'read_only': True}
        }

    def get_avatar(self, obj):
        try:
            user_avatar = UserAvatar.objects.get(user=obj)
            avatar_obj = user_avatar.avatar
            return avatar_obj.image_url
        except ObjectDoesNotExist:
            return None

