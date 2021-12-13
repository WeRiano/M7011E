from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from Simulation.state import State

from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes


@extend_schema(tags=['weather'],
               description="Returns the current temperature (degrees Celsius) in Luleå, Sweden.",
               summary="Get the current temperature")
@api_view(['GET'])
def api_get_temp(request):
    temp = State.instance.get_temp()
    response = {
        "value": temp
    }
    return Response(response)


@extend_schema(tags=['weather'],
               description="Returns the current wind speed (m/s) in Luleå, Sweden",
               summary="Get the current wind speed")
@api_view(['GET'])
def api_get_wind_speed(request):
    ws = State.instance.get_wind_speed()
    response = {
        "value": ws
    }
    return Response(response)


@extend_schema(tags=['economy'],
               description="Returns the total net price per kWh to power the users household."
                           "This is a function of how much power the users turbine provides and what the current"
                           "market price for electricity is.",
               summary="Get the net price of powering a household",
               parameters=[
                   OpenApiParameter(name="demand",
                                    required=True,
                                    description="The power demand of the users household "
                                                "per hour in kilo-watt hours (kWh).",
                                    location=OpenApiParameter.PATH
                                 )
               ])
@api_view(['GET'])
def api_get_net_price(request, demand: float):
    price = State.instance.get_total_price(demand)
    response = {
        "value": price
    }
    return Response(response)


@extend_schema(tags=['economy'],
               description="Returns the current market price for electricity (kWh/kr) in Luleå, Sweden.",
               summary="Get the current market price for electricity")
@api_view(['GET'])
def api_get_market_price(request):
    price = State.instance.get_market_price()
    response = {
        "value": price
    }
    return Response(response)


@extend_schema(tags=['turbine'], methods=['get'],
               description="Returns the amount of power generated by the users turbine in kWh "
                                           "(kilo-watt hours)",
               summary="Get the power generated by the turbine")
@api_view(['GET'])
def api_get_prod_power(request):
    price = State.instance.get_prod_power()
    response = {
        "value": price
    }
    return Response(response)