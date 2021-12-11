"""
WSGI config for backend_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<< HEAD:Simulation/Simulation/wsgi.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Simulation.settings')
=======
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_api.settings')
>>>>>>> origin/backend:backend_api/Core/wsgi.py

application = get_wsgi_application()
