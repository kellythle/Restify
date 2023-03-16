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
from rest_framework.generies import UpdateAPIView, APIView


class EditProperty(UpdateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Property, self.kwargs['pk'])


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

    def post(self, request):
        pass
