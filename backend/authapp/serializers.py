from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers

from .models import User


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = {'id', 'email', 'first_name', 'last_name', 'address',
                  'city', 'zip_code'}
