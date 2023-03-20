from properties.models import Reservation
from properties.serializers import ReservationSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination


class HostReservation(ListAPIView):
    serializer_class = ReservationSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        query = Reservation.objects.filter(property__owner=self.request.user)

        status = self.request.data.get('status')
        if status is not None:
            query = query.filter(status=status)

        return query
