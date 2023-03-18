from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from datetime import datetime
from models import Property
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView  # APIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class AddProperty(APIView):
    permission_classes = [IsAuthenticated]
