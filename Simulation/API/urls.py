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
    path('get_current_conditions/<slug:conditions>/', views.get_conditions),
    path('set_update_frequency/<float:delta>/', views.set_delta),
    path('set_buffer_settings/<float:storing>/<float:using>/', views.set_ratios),

    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui', SpectacularSwaggerView.as_view(), name='swagger-ui')
]