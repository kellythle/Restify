from django.shortcuts import get_object_or_404
from accounts.models import CustomUser
from properties.models import Reservation
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated


class DeleteReservation(DestroyAPIView):
    serializer = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, *args, **kwargs):
        reservation = get_object_or_404(Reservation, id=self.kwargs['pk'])
        user = get_object_or_404(CustomUser, pk=self.request.user.id)
        if user == reservation.property.owner:
            reservation.delete()
            return Response(status=200)
        else:
            return Response([{
                'Error': 'Permission denied.'
            }], status=403)
