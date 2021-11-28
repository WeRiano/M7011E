"""Simulation URL Configuration

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
from django.urls import path, include
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


@api_view(['GET'])
def api_overview(request):
    response = {
        "Temperature": {
            "versions": {
                "1.0": {
                    "endpoint": "/api/version/1/weather/temp",
                    "description": '''Returns the current temperature (degrees celsius) in Luleå, Sweden.\n''',
                    "parameters": {}
                }
            }
        },
        "Wind Speed": {
            "version": {
                "1.0": {
                    "endpoint": "/api/version/{version}/weather/wind_speed",
                    "description": '''Returns the current wind speed (m/s) in Luleå, Sweden.\n''',
                    "parameters": {}
                }
            }
        },
        "Electricity Price": {
            "version": {
                "1.0": {
                    "endpoint": "/api/version/{version}/price/demand/{demand}",
                    "description": "Returns the electricity price in kr which depends on the amount of energy produced by " + \
                                   "the wind turbine, the current market price of energy and the amount of energy demanded.\n",
                    "parameters": {
                        "Demand:": {
                            "Description": '''The amount of energy (kWh) that is demanded per hour.''',
                            "Data Type:": "Double",
                            "Unit": "kWh (Kilowatt-hour)"
                        }
                    }
                }
            }
        },
    }
    return Response(response)


schema_view = get_schema_view(
    openapi.Info(
        title="Test Documentation!",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.google.com",
        contact=openapi.Contact(email="williamfors13@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    url="http://127.0.0.1:8000/api/version/1",
    public=True,
    permission_classes=(permissions.AllowAny,),

)

urlpatterns = [ 
    #path('admin/', admin.site.urls),
    path('api/', api_overview, name="Simulation API overview"),
    path('api/version/1/', include('API.urls'), name="simulation API version 1.0"),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui")
    # TODO: I guess future versions would create another django app and then redirect to that!
    # Main simulation is in the sim app.


]
