from rest_framework import serializers

from . models import userinformation

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = userinformation
        fields = ('email','name', 'uid')
        #fields = '__all__'
    