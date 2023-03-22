from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from accounts.models import CustomUser
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer, PropertyImageSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import DestroyAPIView


class DeleteProperty(DestroyAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        owner = instance.owner
        user = get_object_or_404(CustomUser, id=owner.id)
        if user != self.request.user:
            return Response({
                "Error: Permission denied."
            }, status=403)
        return super().destroy(request)

    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])
