"""
ASGI config for backend_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

<<<<<<< HEAD:Simulation/Simulation/asgi.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Simulation.settings')
=======
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_api.settings')
>>>>>>> origin/backend:backend_api/Core/asgi.py

application = get_asgi_application()
