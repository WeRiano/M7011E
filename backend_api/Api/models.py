from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class User(models.Model):
    uname = models.TextField(unique=True)
    mail = models.TextField()
    password =models.TextField()
    creationdate = models.DateField(auto_now_add=True) 
    userid = models.AutoField(primary_key=True) #auto increments the primary key when new user is created