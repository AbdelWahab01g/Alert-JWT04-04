from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.hashers import make_password

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('controleur', 'Controleur'),
        ('lecteur', 'Lecteur'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        # Automatically set admin permissions based on role
        if self.role == 'admin':
            self.is_staff = True
            self.is_superuser = True
        else:
            self.is_staff = False
            self.is_superuser = False
            
        # Handle password hashing
        if not self.password.startswith('pbkdf2_sha256$'):
            self.set_password(self.password)
            
        super().save(*args, **kwargs)