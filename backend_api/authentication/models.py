from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class MyUserManager(BaseUserManager): #OVERRIDE USERNAME,SUBCLASS BASEUSERMANAGER 

    def create_user(self, email, password, **extra_fields):   
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email) #domain part case insensetive
        user = self.model(email=email, **extra_fields) 
        user.set_password(password) #creates hashed pw
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
     
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class MyUser(AbstractBaseUser, PermissionsMixin): # custom user structure
    email = models.EmailField(unique=True, blank=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    @property
    def token(self):
        pass

    #USING CUSTOM MANAGER
    objects = MyUserManager()

    def __str__(self):
        return self.email

class UserBackend(BaseBackend): # authentication backend and handles user permissions

    #def has_perm(self, user_obj, perm, obj=None):
        #pass
    def authenticate(self, request, email=None, password=None, **kwargs):
        if email is None:
           email = kwargs.get(UserModel.USERNAME_FIELD)
        if email is None or password is None:
            return 
        try:
            user = UserModel._default_manager.get_by_natural_key(email)
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            UserModel().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    #permission determines wheter a certain service is possible to perform
   
    #login/logout handles  #handles sessions ,  and calls  our back end for user authentication.