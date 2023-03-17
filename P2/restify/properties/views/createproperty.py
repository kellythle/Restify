from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView  # APIView
from rest_framework.views import APIView


class AddProperty(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        form1 = AddPropertyForm
        form2 = PropertyImageForm

        if form1.is_valid() and form2.is_valid():
            owner = get_object_or_404(User, pk=request.user.id)
            data = form1.cleaned_data
            images = request.FILES.getlist('image')
            new_property = Property.objects.create(owner, data['property_name'],
                                                   data['address'], data['group_size'],
                                                   data['number_of_beds'], data["number_of_baths"],
                                                   data['date_created'], data["price_night"],
                                                   data['description'])
            for i in images:
                PropertyImages.objects.create(new_property, image=i)
            serialized = PropertySerializer(new_property)
            return serialized
