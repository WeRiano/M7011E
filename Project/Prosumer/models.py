from django.db import models

# Create your models here.

   
class userinformation(models.Model):
   email= models.CharField(max_length=12)
   name = models.CharField(max_length=12)
   uid = models.IntegerField(default=0)

   def __str__(self):
        return self.email
