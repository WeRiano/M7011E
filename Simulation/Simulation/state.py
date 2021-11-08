class State:
    wind_speed: float       # [m/s]
    e_production: float     # [kWh] - function of the wind
    e_consumption: float    # [kWh] - "demand"
    e_price: float          # [kr] - function of e_con and e_production