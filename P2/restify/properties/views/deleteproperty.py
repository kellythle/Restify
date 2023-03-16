from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer, PropertyImageSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generies import DeleteAPIView, APIView


class DeleteProperty(DeleteAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        prop = get_object_or_404(Property, id=self.kwargs['pk'])
