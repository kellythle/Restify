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
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView


class EditProperty(UpdateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def put(self, request):
        prop_owner = get_object_or_404(Property, id=self.kwargs.get('pk'))
        if request.user.id != prop_owner.id:
            return Response([{
                'details': 'Permission denied'
            }])

    def get_object(self):
        return get_object_or_404(Property, self.kwargs['pk'])

    def update(self, request):
        prop_owner = get_object_or_404(Property, id=self.kwargs.get('pk'))
        if request.user.id != prop_owner.id:
            return Response([{
                'details': 'Permission denied'
            }])
        return super().update(self, request)


class EditPropertyImages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        owner_props = Property.objects.all().filter(owner=request.get('id'))
        property = owner_props.get(id=pk)
        images = PropertyImages.objects.all()
        images = images.filter(property=property.id)
        return Response([
            {
                'image': image
            }
            for image in images])

    def post(self, request, pk):
        owner_props = Property.objects.all().filter(owner=request.get('id'))
        property = owner_props.get(id=pk)
        if not property:
            return Response([{
                'details': 'Property either doesn\'t exist or doesn\'t belong to you'
            }])
        images = PropertyImages.objects.all()
        images = images.filter(property=property)
        if not images:
            return Response([{
                'images': 'Wrong images'
            }])

        pass
