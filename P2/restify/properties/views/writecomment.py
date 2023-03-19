from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Comments
from properties.serializers import CommentsSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView, CreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class CreateComment(CreateAPIView):
    serializer_class = CommentsSerializer
