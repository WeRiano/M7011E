from django.core.files import File
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
import base64
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    result = {
        'email': request.user.email,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'address': request.user.address,
        'city': request.user.city,
        'zip_code': request.user.zip_code
    }
    return Response(data=result, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_house_img(request, enc_img, img_type):

    img_b64_decode = base64.decodestring(enc_img)
    img_real = open('profile_picture' + img_type, 'wb')
    img_real.write(img_b64_decode)

    request.user.houseImg.save(
        File(open('profile_picture' + img_type))
    )
    return Response(status=status.HTTP_202_ACCEPTED)