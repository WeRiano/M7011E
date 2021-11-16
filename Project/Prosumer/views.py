from django.http.response import HttpResponse
from django.urls.conf import include
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse

# Create your views here.

def userinfo(request):
        return HttpResponse("it works")
        
    

  