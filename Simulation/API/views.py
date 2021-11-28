from rest_framework.decorators import api_view
from rest_framework.response import Response

from Simulation.state import State


@api_view(['GET'])
def api_get_temp(request):
    temp = State.instance.get_temp()
    response = {
        "value": temp
    }
    return Response(response)


@api_view(['GET'])
def api_get_wind_speed(request):
    ws = State.instance.get_wind_speed()
    response = {
        "value": ws
    }
    return Response(response)


@api_view(['GET'])
def api_get_total_price(request, demand):
    price = State.instance.get_total_price(demand)
    response = {
        "value": price
    }
    return Response(response)


@api_view(['GET'])
def api_get_market_price(request):
    price = State.instance.get_market_price()
    response = {
        "value": price
    }
    return Response(response)


@api_view(['GET'])
def api_get_prod_power(request):
    price = State.instance.get_prod_power()
    response = {
        "value": price
    }
    return Response(response)
