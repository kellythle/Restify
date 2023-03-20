from django.shortcuts import get_object_or_404
from accounts.models import CustomUser
from properties.models import Reservation
from properties.serializers import ReservationSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination


class GuestReservation(ListAPIView):
    serializer_class = ReservationSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = get_object_or_404(CustomUser, pk=self.request.user.id)
        query = Reservation.objects.filter(user=user)

        status = self.request.data.get('status')
        if status is not None:
            query = query.filter(status=status)

        return query
