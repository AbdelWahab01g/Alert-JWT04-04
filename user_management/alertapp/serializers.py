from rest_framework import serializers
from .models import Alert

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['id', 'created_at', 'description', 'niveau', 'action', 'created_by']
        read_only_fields = ['created_at', 'created_by']