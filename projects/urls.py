from django.urls import path
from . import views

urlpatterns = [
    path('pr/', views.project_list, name='project_list'),
]