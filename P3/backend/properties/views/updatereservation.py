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
        editedstatus = request.data.get('status')
        if user == reservation.user:
            if reservation.status == 'appr' and editedstatus == 'canc':
                Notifications.objects.create(
                    recipient=reservation.property.owner,
                    recipient_is_host=False,
                    reservation=reservation,
                    notification_type=2,
                    notification=f"Your property {reservation.property.property_name} has a cancellation request from {reservation.user}."
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
                    'Error': 'Permission denied.'
                }], status=403)
        if user == reservation.property.owner:
            if reservation.status == 'pend' and editedstatus == 'appr':
                Notifications.objects.create(
                    recipient=reservation.user,
                    recipient_is_host=True,
                    reservation=reservation,
                    notification_type=3,
                    notification=f"Your reservation for {reservation.property.property_name} from {reservation.start_date} to {reservation.end_date} has been approved."
                )
                status = 'appr'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            elif reservation.status == 'pend' and editedstatus == 'deni':
                Notifications.objects.create(
                    recipient=reservation.user,
                    recipient_is_host=True,
                    reservation=reservation,
                    notification_type=3,
                    notification=f"Your reservation for {reservation.property.property_name} from {reservation.start_date} to {reservation.end_date} has been declined."
                )
                status = 'deni'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            elif reservation.status == 'appr' and editedstatus == 'term':
                Notifications.objects.create(
                    recipient=reservation.user,
                    recipient_is_host=True,
                    reservation=reservation,
                    notification_type=3,
                    notification=f"Your reservation for {reservation.property.property_name} from {reservation.start_date} to {reservation.end_date} has been terminated."
                )
                status = 'term'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            elif reservation.status == 'peca' and editedstatus == 'canc':
                Notifications.objects.create(
                    recipient=reservation.user,
                    recipient_is_host=True,
                    reservation=reservation,
                    notification_type=4,
                    notification=f"Your cancellation request for {reservation.property.property_name} from {reservation.start_date} to {reservation.end_date} has been approved."
                )
                status = 'canc'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            elif reservation.status == 'peca' and editedstatus == 'pend':
                Notifications.objects.create(
                    recipient=reservation.user,
                    recipient_is_host=True,
                    reservation=reservation,
                    notification_type=4,
                    notification=f"Your cancellation request for {reservation.property.property_name} from {reservation.start_date} to {reservation.end_date} has been denied."
                )
                status = 'pend'
                reservation.status = status
                reservation.save()
                serializer = ReservationSerializer(
                    reservation, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data)
            else:
                return Response([{
                    'Error': 'Permission denied.'
                }], status=403)
        return Response([{
            'Error': 'Permission denied.'
        }], status=403)
