from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer, PropertyImageSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView


class ReadProperty(APIView):
    # serializer_class = PropertySerializer

    def get(self, request, pk):
        ob = get_object_or_404(Property, id=self.kwargs.get('pk'))
        images = PropertyImages.objects.all().filter(property=ob)
        ob = Response(PropertySerializer(ob).data)
        images = {'images': [image.image_url for image in images]}

        ob.data['images'] = images
        print(ob.data)
        return ob
