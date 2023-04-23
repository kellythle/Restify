from rest_framework.permissions import AllowAny
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from properties.models import Property
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer, PropertyImageSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination


class IsOwner(APIView):

    def get(self, request, pk):
        property = get_object_or_404(Property, id=pk)
        if property.owner != request.user:
            return Response({"owner": "false"})
        return Response({"owner": "true"})
