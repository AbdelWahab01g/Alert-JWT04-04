# accounts/urls.py

from django.urls import path
from .views import (
    RegisterView,
    UserListView,
    MyTokenObtainPairView,
    AdminDashboardView,
    ControleurDashboardView,
    LecteurDashboardView,
    user_list, 
    user_detail
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('controleur-dashboard/', ControleurDashboardView.as_view(), name='controleur-dashboard'),
    path('lecteur-dashboard/', LecteurDashboardView.as_view(), name='lecteur-dashboard'),
    path('users/', user_list, name='user-list'),
    path('users/<int:pk>/', user_detail, name='user-detail'),
]