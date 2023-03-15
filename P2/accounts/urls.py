from django.urls import path
from . import views

app_name = 'accounts'
url_patterns = [
    path('login/', views.LoginView.as_view(), name='login'),
]
