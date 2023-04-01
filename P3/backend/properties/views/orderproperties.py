from rest_framework.permissions import AllowAny
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer, PropertyImageSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 1000


class OrderSortProperties(ListAPIView):
    serializer_class = PropertySerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        properties = Property.objects.all()
        if self.request.data.get('groupsize'):
            properties = properties.filter(
                number_of_beds__gt=self.request.data.get('groupsize'))
        if self.request.data.get('minprice'):
            properties = properties.filter(
                price_night__gt=self.request.data.get('minprice'))
        if self.request.data.get('maxprice'):
            properties = properties.filter(
                price_night__lt=self.request.data.get('maxprice'))
        if self.request.data.get('numbeds'):
            properties = properties.filter(
                number_of_beds__gt=self.request.data.get('numbeds'))
        if self.request.data.get('amenities'):
            lst = self.request.data.get('amenities')
            for amenity in lst:
                properties = properties.filter(amenities=amenity)
        if self.request.data.get('sort'):
            if self.request.data.get('sort') == 'prasc':
                properties = properties.order_by('price_night')
            elif self.request.data.get('sort') == 'prdec':
                properties = properties.order_by('-price_night')
            elif self.request.data.get('sort') == 'mgasc':
                properties = properties.order_by('groupsize')
            elif self.request.data.get('sort') == 'mgdec':
                properties = properties.order_by('-groupsize')
        return properties
