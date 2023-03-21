from django.shortcuts import get_object_or_404
from datetime import datetime
from accounts.models import CustomUser
from properties.models import Property, Reservation, Notifications
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated


class EditReservation(UpdateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Reservation, id=self.kwargs['pk'])

    def partial_update(self, request, *args, **kwargs):
        reservation = self.get_object()
        user = get_object_or_404(CustomUser, pk=request.user.id)
        property = get_object_or_404(Property, id=self.kwargs.get('pk'))
        editedstatus = request.data.get('status')

        if user == reservation.user:
            if reservation.status == 'pend' and editedstatus == 'canc':
                Notifications.objects.create(
                    recipient=property.owner,
                    recipient_is_host=False,
                    reservation=reservation,
                    notification_type=2,
                    notification=f"Your property {property.property_name} has a cancellation request from {reservation.user}."
                )
                status = 'peca'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            else:
                return Response([{
                    'details': 'Permission denied'
                }])
        if user == property.owner:
            if reservation.status == 'pend' and editedstatus == 'appr':
                Notifications.objects.create(
                    recipient=property.owner,
                    recipient_is_host=True,
                    reservation=reservation,
                    notification_type=3,
                    notification=f"Your reservation for {property.property_name} from {reservation.start_date} to {reservation.end_date} has been approved."
                )
                status = 'appr'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            elif reservation.status == 'peca' and editedstatus == 'canc':
                Notifications.objects.create(
                    recipient=property.owner,
                    recipient_is_host=True,
                    reservation=reservation,
                    notification_type=4,
                    notification=f"Your cancellation request for {property.property_name} from {reservation.start_date} to {reservation.end_date} has been approved."
                )
                status = 'canc'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            else:
                return Response([{
                    'details': 'Permission denied'
                }])
        return Response([{
            'details': 'Permission denied'
        }])
