from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from .models import User


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'address',
                  'city', 'zip_code')


