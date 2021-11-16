import requests
import math
import json


class State:
    __wind_speed: float       # [m/s]
    __e_production: float     # [kWh] - function of the wind
    __e_consumption: float    # [kWh] - "demand"
    __e_price: float          # [kr] - function of e_con and e_production

    def set_wind_speed(self, ws: float):
        self.__wind_speed = ws

        # https://energyeducation.ca/encyclopedia/Wind_power
        # exponential relationship from cut-in speed to the rated speed
        # (negative) linear relationship from rated speed to the cut-out speed

        # https://www.intechopen.com/chapters/40439
        # The wind power captured by a turbine is commonly expressed as a function of the turbine’s
        # swept area and a coefficient of performance, the air density and the wind speed

        # dimensionless coefficient of performance
        # http://www.wiete.com.au/journals/WTE&TE/Pages/Vol.11,%20No.1%20(2013)/06-Libii-J-N.pdf
        # this varies between 0 all the way to the upper limit of 0.593 (Betz limit)
        # "is defined as the ratio of the power captured by the rotor of the wind turbine, p_r,
        # divided by the total power available in the wind, P
        # TODO: Improve this??? For now I will keep it a constant of 0.25 which should be an approximate median
        Cp = 0.4

        # ρ is the air density in kg/m3 where (https://en.wikipedia.org/wiki/Density_of_air)
        abs_pr = 101325 # absolute pressure (Pa)
        abs_t = self.fetch_temp() + 273.15   # absolute temperature (K)
        r_sp = 287.058 # specific gas constant for dry air (J/kg*K)
        p = abs_pr / (r_sp * abs_t) # ρ is the air density in kg/m3.

        # A is the swept area of the turbine in m2. Lets pretend that all users have the same turbine and that the
        # length of the rotor blades are ...
        blade_len = 2   # [m]
        A = math.pi * (blade_len * blade_len)
        #V = self.__wind_speed # V is the speed of the wind in m/s
        p_turbine = 1/2 * Cp * p * A * (self.__wind_speed*self.__wind_speed*self.__wind_speed)  # [W]

        # TODO: Add cut-in and cut-out values?
        self.__e_production = p_turbine / 1000
        print("Setting producing power to: " + str(self.__e_production) + " kW")

    def fetch_temp(self) -> float:
        url = "http://api.temperatur.nu/tnu_1.17.php"
            # "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/22/station/162870/period/latest-months/data.json"
            # "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/22/station/162860.json"

        # defining a params dict for the parameters to be sent to the API
        params = {
            "p": "mjolkudden",
            "cli": "wind_turbine_simulator_LTU_M7011E"
        }

        # sending get request and saving the response as response object
        r = requests.get(url=url, params=params)

        #print(r)
        # extracting data in json format
        data = r.json()
        #print(json.dumps(data, indent=2))
        return float(data["stations"][0]["temp"])