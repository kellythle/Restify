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
from rest_framework.generies import ListAPIView, APIView
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class OrderSortProperties(ListAPIView):
    serializer_class = Property
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        properties = Property.objects.all()
        if self.kwargs.get('groupsize'):
            properties = properties.filter(
                number_of_beds__gt=self.kwargs.get('groupsize'))
        if self.kwargs.get('minprice'):
            properties = properties.filter(
                price_night__gt=self.kwargs.get('minprice'))
        if self.kwargs.get('maxprice'):
            properties = properties.filter(
                price_night__lt=self.kwargs.get('maxprice'))
        if self.kwargs.get('numbeds'):
            properties = properties.filter(
                number_of_beds__gt=self.kwargs.get('numbeds'))
        if self.kwargs.get('sort'):
            if self.kwargs.get('sort') == 'prasc':
                properties = properties.order_by('price_night')
            elif self.kwargs.get('sort') == 'prdec':
                properties = properties.order_by('-price_night')
            elif self.kwargs.get('sort') == 'mgasc':
                properties = properties.order_by('groupsize')
            elif self.kwargs.get('sort') == 'mgdec':
                properties = properties.order_by('-groupsize')
        return properties
