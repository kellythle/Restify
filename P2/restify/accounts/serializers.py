from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'isHost')
        extra_kwargs = {'password': {'write_only': True}}

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

        if errors:
            raise ValidationError(errors)

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'avatar', 'phone_number', 'isHost')
        extra_kwargs = {
            'username': {'read_only': True}
        }
