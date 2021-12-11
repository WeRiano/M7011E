"""backend_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
<<<<<<< HEAD:Simulation/Simulation/urls.py
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response

urlpatterns = [ 
    #path('admin/', admin.site.urls),
    #path('api/', api_overview, name="Simulation API overview"),
    path('api/version/1/', include('API.urls'), name="simulation API version 1.0")
    # TODO: I guess future versions would create another django app and then redirect to that!
    # Main simulation is in the sim app.
=======
from django.urls import path,include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('Api.urls', namespace='Site_api'))

   # path('api/', include('project.urls')), #new line
>>>>>>> origin/backend:backend_api/Core/urls.py
]
