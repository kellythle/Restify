from django.shortcuts import get_object_or_404
from properties.models import Property, Reservation, Notifications
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated


class EditReservation(UpdateAPIView):
    serializer = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        reservation = get_object_or_404(Reservation, id=self.kwargs.get['pk'])
        property = get_object_or_404(Property, id=self.kwargs.get['pk'])
        editedstatus = self.request.data.get('status')
        if request.user == reservation.user and reservation.status == 'pend' and editedstatus == 'canc':
            Notifications.objects.create(
                recipient=property.owner,
                recipient_is_host=False,
                reservation=reservation,
                notification_type=2
            )
            reservation.status = 'peca'
        elif request.user == property.owner and reservation.status == 'pend' and editedstatus == 'appr':
            Notifications.objects.create(
                recipient=property.owner,
                recipient_is_host=True,
                reservation=reservation,
                notification_type=3
            )
        elif request.user == property.owner and reservation.status == 'peca' and editedstatus == 'canc':
            Notifications.objects.create(
                recipient=property.owner,
                recipient_is_host=True,
                reservation=reservation,
                notification_type=4
            )
        else:
            return Response([{
                'details': 'Permission denied'
            }])

        return super().update(self, request, pk)
