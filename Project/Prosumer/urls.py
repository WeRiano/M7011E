from django.urls import path

from . import views

urlpatterns = [
    path('', views.userinfo ,name='userinfo'),
]