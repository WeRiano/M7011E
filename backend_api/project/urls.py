
from django.urls import path,include
from . import views

urlpatterns = [   
    path('user_api/', views.user_api), #FUNCTION BASED VIEW
]