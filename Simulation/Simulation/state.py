import math


class State:
    instance = None

    __temp: float               # [degrees celsius]
    __wind_speed: float         # [m/s]
    __e_prod_power: float       # [kWh] - function of the wind. How much energy the wind-turbine can produce for 1 hour.
    __e_market_price: float     # [kr/kWh]

    __buffer: float             # [kWh] - [0, 13.5]

    def __init__(self):
        if State.instance is None:
            State.instance = self
        else:
            raise Exception("State instance already created!")
            return

    def update_state_conditions(self, ws, temp, market_price):
        self.__wind_speed = ws
        self.__temp = temp
        self.__e_market_price = market_price
        self.__e_prod_power = State.__calc_prod_power(ws, temp)

    @staticmethod
    def __calc_prod_power(ws, temp):
        # Calculate and set self.__e_prod_power which depends on the current wind speed and temp

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
        # TODO: Improve this??? Coefficient varies dependent on wind speed
        Cp = 0.4

        # ρ is the air density in kg/m3 where (https://en.wikipedia.org/wiki/Density_of_air)
        abs_pr = 101325  # absolute pressure (Pa)
        abs_t = temp + 273.15  # absolute temperature (K)
        r_sp = 287.058  # specific gas constant for dry air (J/kg*K)
        p = abs_pr / (r_sp * abs_t)  # ρ is the air density in kg/m3.

        # A is the swept area of the turbine in m2. Lets pretend that all users have the same turbine and that the
        # length of the rotor blades are ...
        blade_len = 2  # [m]
        A = math.pi * (blade_len * blade_len)
        p_turbine = 1 / 2 * Cp * p * A * (ws * ws * ws)  # [W]

        result = p_turbine / 1000
        # TODO: Add cut-in and cut-out values? Is there a wind speed that generates 0 power?
        print("The wind turbine is now generating: " + str(result) + " kWh energy every hour!")
        return result

    def get_total_price(self, demand):
        if demand > self.__e_prod_power:
            diff = demand - self.__e_prod_power
            return diff * self.__e_market_price
        else:
            # Woo I am self sufficient!
            return 0

    def get_market_price(self) -> float:
        return self.__e_market_price

    def get_wind_speed(self) -> float:
        return self.__wind_speed

    def get_temp(self) -> float:
        return self.__temp



    def get_prod_power(self) -> float:
        return self.__e_prod_power
