from django.shortcuts import get_object_or_404
from models import Reservation
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated

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
from rest_framework.generics import DestroyAPIView


class DeleteReservation(DestroyAPIView):
    serializer = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self):
        reservation = get_object_or_404(Reservation, id=self.kwargs['pk'])
        reservation.delete()
        return Response(status=200)
