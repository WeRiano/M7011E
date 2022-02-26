# Project description
This is a web application for the course M7011E at LTU. 
This application is to be solved by using a service oriented architecture approach where you
implement small services that interact over a well defined API, while together forming a web
application as a whole, which a client can consume through their browser - on any browser 
supported platform.

This application is split into 3 different microservices:

- A user backend service
- An electricity simulation service
- A frontend service

For more information about the system and individual services, see the .pdf in this directory.

# Requirements

- Docker Engine version 20.10 or later

- Docker-compose version 1.29 or later

(Earlier versions might work but not tested and approved)

# Hosting all the services at once

## Installation

First clone the repository

```
git clone https://github.com/WeRiano/M7011E
```

then change to the cloned directory and build the docker-images

```
docker-compose build
```

## Configuration

The following values has to be configured in a .env file located in the main project 
directory

- DJANGO_SECRET_KEY - Secret key used by the simulation and backend service. Should be 
exactly 50 characters. Can be generated with tools such as https://djecrety.ir/
- POSTGRES_PASS - Password for the database used in the user backend service.
- REACT_APP_AUTH_TOKEN_SECRET_PHRASE - Secret password used for encrypting the 
authentication token when it is stored as a cookie.
- HOST_IP - The IP address of which the services are hosted on. Used when the frontend 
and simulation service is accessing the other services.

See the .env.sample file in this directory for an example. You can change the values
in the file and then rename it.


## Running

Navigate to the main project directory and run

```
docker-compose up
```

This is going to also build the images if required.

To stop the services run

```
docker-compose down
```

where you can add the optional `-v` flag to reset the user database.

## Creating backend admin user

Run the following commands

```
docker exec -it m7011e_backend_1 /bin/sh
python manage.py createsupoeruser
```

The console will now prompt you to enter all the necessary account information. Do so. Once you are done
and the superuser is created, type ``exit``.


# Hosting individual services

## Installation

First clone one of the individual services

```
git clone https://github.com/WeRiano/M7011E-Backend 
```

or

```
git clone https://github.com/WeRiano/M7011E-Simulation 
```

or 

```
git clone https://github.com/WeRiano/M7011E-Frontend 
```

then change to the cloned directory and build the docker image

```
docker build -t my-service-image .
```

## Configuration

The following values has to be configured for the specific service in a .env file located
in the main project directory:

### Backend

- DJANGO_SECRET_KEY - Secret key used by the simulation and backend service. Should be 
exactly 50 characters. Can be generated with tools such as https://djecrety.ir/
- POSTGRES_PASS - Password for the database used in the user backend service.

### Simulation

- DJANGO_SECRET_KEY - Secret key used by the simulation and backend service. Should be 
exactly 50 characters. Can be generated with tools such as https://djecrety.ir/
- BACKEND_IP - The public IP address of the host that is running the backend service.

### Frontend

- REACT_APP_AUTH_TOKEN_SECRET_PHRASE - Secret password used for encrypting the 
authentication token when it is stored as a cookie.
- REACT_APP_BACKEND_IP - The public IP address of the host that is running the backend service.
- REACT_APP_SIMULATION_IP - The public IP address of the host that is running the simulation service.

## Running

```
docker run --env-file .env -dp <port_map> my-service-image
```

where `<port_map>` should be replaced with the following expression for each service:

- Backend service: `7999:8000`.
- Simulation service: `8000:8000`.
- Frontend service: Any possible host port (`<host_port>:80`) works for this service, 
but preferably `80:80`.