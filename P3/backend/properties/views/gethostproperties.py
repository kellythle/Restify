from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from properties.models import Property, PropertyImages
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from properties.serializers import PropertySerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 1000


class GetHostProperties(ListAPIView):
    serializer_class = PropertySerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # all_properties = Property.objects.all().filter(owner=self.request.user)
        # images = PropertyImages.objects.all().filter(property=ob)
        # ob = Response(PropertySerializer(ob).data)
        return Property.objects.all().filter(owner=self.request.user)
