from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from accounts.models import CustomUser
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView  # APIView
from rest_framework.views import APIView
from django.conf import settings


class AddProperty(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # form1 = AddPropertyForm()
        # form2 = PropertyImageForm()

        # if form1.is_valid() and form2.is_valid():
        owner = get_object_or_404(CustomUser, pk=request.user.id)
        data = request.data
        images = request.FILES.getlist('image')
        new_property = Property.objects.create(owner=owner, property_name=data['property_name'],
                                               address=data['address'], group_size=data['group_size'],
                                               number_of_beds=data['number_of_beds'], number_of_baths=data["number_of_baths"],
                                               date_created=data['date_created'], price_night=data["price_night"],
                                               description=data['description'])
        for i in images:
            PropertyImages.objects.create(property=new_property, image=i)
        serialized = PropertySerializer(new_property).data
        return Response(serialized)
