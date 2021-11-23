
from django.urls import path,include
from . import views

app_name = 'site_api'

urlpatterns = [   
    path('', views.user_api), #FUNCTION BASED VIEW
                                       #other functionality
]