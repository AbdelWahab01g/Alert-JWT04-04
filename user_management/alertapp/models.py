from django.db import models
from accounts.models import CustomUser

class Alert(models.Model):
    NIVEAU_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    ACTION_CHOICES = [
        ('evacuate', 'Evacuate'),
        ('shelter', 'Shelter'),
        ('monitor', 'Monitor'),
    ]

    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=25)
    niveau = models.CharField(max_length=6, choices=NIVEAU_CHOICES)
    action = models.CharField(max_length=8, choices=ACTION_CHOICES)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.created_at} - {self.niveau} alert"
    
    class Meta:
        app_label = 'alertapp'