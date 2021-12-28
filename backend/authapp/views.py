from django.core.files import File
from django.http import FileResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
import base64
from rest_framework import status

from backend.settings import MEDIA_ROOT
from .models import User

import os


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    data = json.loads(request.body)
    email = data['email']
    first_name = data['first_name']
    last_name = data['last_name']
    address = data['address']
    city = data['city']
    zip_code = data['zip_code']

    user = request.user
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.address = address
    user.city = city
    user.zip_code = zip_code
    user.save()

    response = {
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
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


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def set_house_img(request):
    data = json.loads(request.body)
    enc_img = data['file']
    img_type = data['type']
    img_data = base64.b64decode(enc_img)

    old_file_path = MEDIA_ROOT + '\\' + str(request.user.house_img)

    # FOR SOME REASON DJANGO DOESNT OVERWRITE EXISTING FILES
    # hence this is not actually the real new file name.
    # The real file name is new_file_name + some hash! Thanks django!
    new_file_name = str(request.user.id) + '_prof_pic.' + img_type
    new_file_path = MEDIA_ROOT + '\\' + new_file_name

    # We create a temporary file so we can write data (given by the frontend) to it
    file_write = File(open(new_file_path, 'wb'))
    file_write.write(img_data)
    file_write.close()

    # Save the new file to the database. Again: HASH IS ADDED TO THE NAME!
    request.user.house_img.save(new_file_name, File(open(new_file_path, 'rb')))
    request.user.save()

    # Delete the temporary file
    os.remove(new_file_path)

    # We also delete the old file as long as its not the static default picture
    if old_file_path != MEDIA_ROOT + '\\' + 'default_prof_pic.jpeg':
        os.remove(old_file_path)
    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_house_img(request):
    file = request.user.house_img
    img_type = file.name.split('.')[1]
    img = open(MEDIA_ROOT + '\\' + file.name, 'rb')
    return FileResponse(img, content_type='image/' + img_type)
