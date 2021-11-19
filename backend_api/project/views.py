# project/views.py

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from .models import User    
from .serializers import UserSerializer


@api_view(['GET','POST']) #CRUD #function-based view
def user_api(request):
    if(request.method == "GET"):  
        uname2= request.data.get("uname")   
        if uname2 is not None:
            user= User.objects.get(uname = uname2) #add query based on url
            userserializer=UserSerializer(user) #serializer.data 
            jsondata= JSONRenderer().render(userserializer.data) 
            return HttpResponse(jsondata,content_type='application/json')

    if(request.method =="POST"):
        serializer = UserSerializer(data=request.data) #request must be json file format 
        if serializer.is_valid():
            serializer.save()
            msg = {'msg : New user created'}
            jsondata = JSONRenderer().render(msg)
            return HttpResponse(jsondata,content_type='application/json')
        return HttpResponse(JSONRenderer().render(serializer.errors), status=status.HTTP_400_BAD_REQUEST)
    