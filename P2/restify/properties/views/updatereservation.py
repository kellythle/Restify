from django.shortcuts import get_object_or_404
from models import Property, Reservation
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated


class EditReservation(UpdateAPIView):
    serializer = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request):
        reservation = get_object_or_404(Reservation, id=self.kwargs.get('pk'))
        property = get_object_or_404(Property, id=self.kwargs.get('pk'))
        if request.user != reservation.user:
            return Response([{
                'details': 'Permission denied'
            }])

        if request.user != property.owner:
            return Response([{
                'details': 'Permission denied'
            }])

        return super().update(self, request)
