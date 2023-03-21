from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from accounts.models import CustomUser
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Notifications, Reservation, notifications
from properties.serializers import NotificationSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView, CreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class GetUserNotifications(ListAPIView):
    serializer_class = NotificationSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # notification = get_object_or_404(
        #     Notifications, id=self.kwargs.get('pk'))
        # check = self.request.user
        # if notification.recipient != check:
        #     return Response([{
        #         'Error': 'Invalid credentials'
        #     }])
        user = get_object_or_404(CustomUser, pk=self.request.user.id)
        return Notifications.objects.all().filter(recipient=user)


class DeleteUserNotification(DestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, *args, **kwargs):
        # curr_user = self.kwargs.get('pk')
        # check = self.request.user
        # if curr_user != check:
        #     return Response([{
        #         'Error': 'Invalid credentials'
        #     }])
        user = get_object_or_404(CustomUser, pk=self.request.user.id)
        try:
            noti = Notifications.objects.get(id=self.kwargs.get('pk'))
        except:
            return Response([{
                "Error": "Notification does not exist."
            }])
        if noti.recipient != user:
            return Response([{
                "Error": "Not your notification."
            }])
        return noti.delete()


class UpdateNotificationRead(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        noti = Notifications.objects.get(id=pk)
        recipient = noti.recipient
        if request.user != recipient:
            return Response([{
                "Error": "Not your notification."
            }])
        noti.is_read = not noti.is_read
        noti.save()
        return HttpResponse(status=200)


class CreateNotification(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def post(self, request, pk):
        if request.user.id != pk:
            return Response([{
                "Error": "Not your notification."
            }])
        new_notification = Notifications.objects.create(recipient=request.data.get('recipient'),
                                                        recipient_is_host=request.data.get(
                                                            'is_host'),
                                                        reservation=request.data.get(
                                                            'reservation'), is_read=False,
                                                        notification_type=notifications[request.data.get('message')])
        return super().post(request, pk)
