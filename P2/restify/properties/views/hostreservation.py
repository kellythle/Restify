from django.shortcuts import get_object_or_404
from datetime import date
from accounts.models import CustomUser
from properties.models import Reservation, Property
from properties.serializers import ReservationSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination


class HostReservation(ListAPIView):
    serializer_class = ReservationSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = get_object_or_404(CustomUser, pk=self.request.user.id)
        query = Reservation.objects.filter(property__owner=user)

        for reserv in query:
            if reserv.end_date < date.today() and reserv.status == 'appr':
                reserv.status = 'comp'
                reserv.save()
                serializer = ReservationSerializer(
                    reserv, data=self.request.data, partial=True)
                serializer.is_valid(raise_exception=True)

        status = self.request.data.get('status')
        if status is not None:
            query = query.filter(status=status)

        return query
