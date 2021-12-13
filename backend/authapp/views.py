from django.core import serializers
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework import status

from .models import User


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    data = json.loads(request.body)
    email = data['email']
    address = data['address']
    city = data['city']
    zip_code = data['zip_code']

    user = request.user
    user.email = email
    user.address = address
    user.city = city
    user.zip_code = zip_code
    user.save()

    response = {
        'email': email,
        'address': address,
        'city': city,
        'zip_code': zip_code,
    }

    return Response(data=response, status=status.HTTP_202_ACCEPTED)
