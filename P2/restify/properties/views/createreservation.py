from django.shortcuts import get_object_or_404
from datetime import datetime
from accounts.models import CustomUser
from properties.models import Reservation, Notifications, Property
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class CreateReservation(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = get_object_or_404(CustomUser, pk=request.user.id)
        property = get_object_or_404(
            Property, pk=request.data.get('property'))
        start_date = datetime.strptime(
            self.request.data.get('start_date'), '%Y-%m-%d').date()
        end_date = datetime.strptime(
            self.request.data.get('end_date'), '%Y-%m-%d').date()
        message = self.request.data.get('message')
        reservations = Reservation.objects.filter(property=property)
        if request.method == 'POST':
            # checks if dates are available
            for reserv in reservations:
                if reserv.start_date <= end_date and reserv.end_date >= start_date and reserv.status == 'appr':
                    return Response(status=403)
            new_reserv = Reservation.objects.create(
                user=user,
                property=property,
                start_date=start_date,
                end_date=end_date,
                message=message,
                status='pend')
            Notifications.objects.create(
                recipient=property.owner,
                recipient_is_host=True,
                reservation=new_reserv,
                notification_type=1
            )
        serialized = ReservationSerializer(new_reserv).data
        return Response(serialized)
