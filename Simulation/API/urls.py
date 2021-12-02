from django.urls import path, register_converter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from rest_framework import permissions
from . import views


class FloatConverter:
    regex = '[\d\.\d]+'

    def to_python(self, value):
        return float(value)

    def to_url(self, value):
        return '{}'.format(value)


register_converter(FloatConverter, 'float')

urlpatterns = [
    path('weather/temp/', views.api_get_temp),
    path('weather/wind_speed/', views.api_get_wind_speed),

    path('economy/net_price/demand/<float:demand>/', views.api_get_net_price, name="Test"),
    path('economy/market_price/', views.api_get_market_price),

    path('turbine/power/', views.api_get_prod_power),

    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui', SpectacularSwaggerView.as_view(), name='swagger-ui')
]