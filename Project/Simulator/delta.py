from . state import State
from enum import Enum
from datetime import date
from numpy import random


# This class is response for manipulating the state
class Delta:
    __state: State
    __real_data: bool

    # TODO: Should be a function of the season somehow?
    __daily_wind_mean: float    # [m/s]
    __hourly_wind_mean: float   # [m/s]

    # Average Wind Speed (mph) montly (Jan to Dec) [8.2, 7.8, 7.5, 6.8, 6.4, 6.2, 6.3, 6.8, 7.6, 8.2, 8.3, 8.4]
    # source: https://weatherspark.com/y/89129/Average-Weather-in-Lule%C3%A5-Sweden-Year-Round

    # "The standard deviation of annual mean wind speed over the 20 year period is approximately 5 per cent of the mean"
    # source: https://www.wind-energy-the-facts.org/the-annual-variability-of-wind-speed.html

    def __init__(self, state: State):
        self.__state: State = state
        self.__daily_ws_mu: float = 0
        self.__last_update_day: int = -1

    # Updates the wind speed of the given state that is passed to delta upon construction.
    # The simulation is split up into two parts: simulating daily and hourly wind.
    # The daily wind is based upon observations from
    # https://weatherspark.com/y/89129/Average-Weather-in-Lule%C3%A5-Sweden-Year-Round
    # and drawn from a normal distribution. The hourly wind is based upon the daily wind and drawn
    # from a normal distribution
    def update_state(self):
            today = date.strftime(date.today(), "%d-%m-%y")
            today = today.split("-")
            if int(today[0]) != self.__last_update_day:
                self.__last_update_day = today[0]
                # Average Wind Speed (mph) montly (Jan to Dec) [8.2, 7.8, 7.5, 6.8, 6.4, 6.2, 6.3, 6.8, 7.6, 8.2, 8.3, 8.4]
                # source: https://weatherspark.com/y/89129/Average-Weather-in-Lule%C3%A5-Sweden-Year-Round
                avg_ws_month = [8.2, 7.8, 7.5, 6.8, 6.4, 6.2, 6.3, 6.8, 7.6, 8.2, 8.3, 8.4]

                mu = avg_ws_month[int(today[1])] * 0.44704  # convert from mph to m/s

                # "The standard deviation of annual mean wind speed over the
                # 20 year period is approximately 5 per cent of the mean"
                # source: https://www.wind-energy-the-facts.org/the-annual-variability-of-wind-speed.html
                std_dev_day = mu * 0.10

                self.__daily_ws_mu = random.normal(mu, std_dev_day, None)

            std_dev_hour = self.__daily_ws_mu * 0.01
            self.__state.set_wind_speed(random.normal(self.__daily_ws_mu, std_dev_hour, None))
