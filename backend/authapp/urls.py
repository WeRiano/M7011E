from django.urls import path, include
from authapp import views

urlpatterns = [
    path('users/update_profile/', views.update_profile),
    path('users/get_profile', views.get_profile),
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken'))
]