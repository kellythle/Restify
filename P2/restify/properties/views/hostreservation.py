from properties.models import Reservation
from properties.serializers import ReservationSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination


class HostReservation(ListAPIView):
    serializer_class = ReservationSerializer
    pagination_class = PageNumberPagination

    def host_filter(self, request):
        query = Reservation.objects.filter(property__owner=request.user)

        status = self.request.get('status')
        if status is not None:
            query = query.filter(status=status)

        return query
