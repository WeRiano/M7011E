# project/serializers.py
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.uname = validated_data.get('uname',instance.uname)
        instance.password = validated_data.get('password',instance.password)
        instance.mail = validated_data.get('mail',instance.mail)
        instance.creationdate = validated_data.get('creationdate',instance.creationdate)
        instance.save()
        return instance
        
   #def validate_uname(self, value):

   #def validate(self, data):
    
    
