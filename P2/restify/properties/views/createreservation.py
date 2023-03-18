from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from models import Reservation
from properties.serializers import ReservationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class CreateReservation(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = get_object_or_404(User, pk=request.user.id)
        property = self.request.data.get('property')
        start_date = self.request.data.get('start_date')
        end_date = self.request.data.get('end_date')
        message = self.request.data.get('message')
        reservations = Reservation.objects.filter(property=property)
        if request.method == 'POST':
            data = request
            serializer = ReservationSerializer(data=data)
            if serializer.is_valid():
                # checks if dates are available
                for reserv in reservations:
                    if reserv.start_date <= end_date and reserv.end_date >= start_date:
                        return Response(serializer.errors, status=403)
                serializer.save(user=user, property=property, start_date=start_date,
                                end_date=end_date, message=message, status='pend')
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
