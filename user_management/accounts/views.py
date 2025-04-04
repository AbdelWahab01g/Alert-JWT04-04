# accounts/views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import CustomUser
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer
#add
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import CustomUser
from .serializers import CustomUserSerializer



class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class AdminDashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request):
        content = {'message': 'Welcome to Admin Dashboard'}
        return Response(content)

class ControleurDashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        if request.user.role != 'controleur':
            return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
        content = {'message': 'Welcome to Controleur Dashboard'}
        return Response(content)

class LecteurDashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        if request.user.role != 'lecteur':
            return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)
        content = {'message': 'Welcome to Lecteur Dashboard'}
        return Response(content)
    


@api_view(['GET'])
@permission_classes([IsAdminUser])
def user_list(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUser])
def user_detail(request, pk):
    user = get_object_or_404(CustomUser, pk=pk)
    
    if request.method == 'GET':
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)