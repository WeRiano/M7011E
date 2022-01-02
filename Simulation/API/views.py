import json
from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from Simulation.state import State
from Simulation.manager import Manager


@extend_schema(tags=['weather'],
               description="Returns the current temperature (degrees Celsius) in Luleå, Sweden.",
               summary="Get the current temperature")
@api_view(['GET'])
def get_conditions(request, conditions):
    conditions = Manager.get_conditions(conditions, request.headers['Authorization'])
    return Response(data=conditions, status=status.HTTP_200_OK)


@extend_schema(tags=['weather'],
               description="Returns the current temperature (degrees Celsius) in Luleå, Sweden.",
               summary="Get the current temperature")
@api_view(['POST'])
def set_delta(request, delta):
    Manager.set_delta(delta)
    return Response(status=status.HTTP_202_ACCEPTED)


@extend_schema(tags=['weather'],
               description="Returns the current temperature (degrees Celsius) in Luleå, Sweden.",
               summary="Get the current temperature")
@api_view(['POST'])
def set_ratios(request, saving, using):
    if (saving < 0.0 or saving > 1.0) or (using < 0.0 or using > 1.0):
        response = {
            "error": "Ratios must be on the interval [0.0, 1.0] (0% to 100%)"
        }
        return Response(data=response, status=status.HTTP_403_FORBIDDEN)
    Manager.set_ratios(saving, using, request.headers["Authorization"])
    return Response(status=status.HTTP_202_ACCEPTED)