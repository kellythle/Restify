from django.shortcuts import get_object_or_404
from properties.models import Reservation
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated


class DeleteReservation(DestroyAPIView):
    serializer = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self):
        reservation = get_object_or_404(Reservation, id=self.kwargs['pk'])
        reservation.delete()
        return Response(status=200)
