from django.urls import path
from .views import AlertCreateView, AlertListView, AlertDestroyView

urlpatterns = [
    path('', AlertListView.as_view(), name='alert-list'),
    path('create/', AlertCreateView.as_view(), name='alert-create'),
    path('<int:pk>/delete/', AlertDestroyView.as_view(), name='alert-delete'),
]