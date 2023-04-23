from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from accounts.models import CustomUser
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages, Amenities
from properties.serializers import PropertySerializer
import datetime
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
        if not owner.isHost:
            return Response({
                "Error": "Must be a host to create properties"
            }, status=403)
        data = request.data
        images = request.FILES.getlist('image')
        amenities = data['amenities'].split(',')
        print('here')
        new_property = Property.objects.create(owner=owner, property_name=data['property_name'],
                                               address=data['address'], group_size=data['group_size'],
                                               number_of_beds=data['number_of_beds'], number_of_baths=data["number_of_baths"],
                                               date_created=data.get('date_created', datetime.date.today()), price_night=data["price_night"],
                                               description=data['description'])
        print(request.data.getlist('image'))
        for amenity in amenities:
            if not Amenities.objects.filter(id=amenity).exists():
                return Response({
                    "Error": "At least one amenity doesn't exist"
                })
            new_property.amenities.add(Amenities.objects.get(id=amenity))
        for i in images:
            img = PropertyImages.objects.create(
                property=new_property, image=i)
            img.image_url = img.image.path
            img.save()

        serialized = PropertySerializer(new_property).data
        return Response(serialized)
