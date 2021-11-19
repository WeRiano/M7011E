from django.db import models

# Create your models here.

class User(models.Model):
    uname = models.TextField()
    mail = models.TextField()
    password =models.TextField()
    creationdate = models.TextField()