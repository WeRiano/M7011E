from state import State
from delta import Delta
from datetime import date
import time

if __name__ == "__main__":
    today = date.today()
    s = today.strftime("%d-%m-%y")

    state = State()
    delta = Delta(state, False)

    # driver for Delta. We update state until the application is terminated
    while True:
        delta.update_state()
        time.sleep(3600)
