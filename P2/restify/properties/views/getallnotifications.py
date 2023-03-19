from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from properties.forms import AddPropertyForm, EditPropertyForm, PropertyImageForm
from properties.models import Notifications, PropertyImages
from properties.serializers import PropertySerializer, PropertyImageSerializer
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
    serializer_class = Notifications
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        curr_user = self.kwargs.get('pk')
        check = self.request.user
        if curr_user != check:
            return Response([{
                'Error': 'Invalid credentials'
            }])
        return Notifications.objects.all().filter(recipient=curr_user)


class DeleteUserNotification(DestroyAPIView):
    serializer_class = Notifications
    permission_classes = [IsAuthenticated]

    def get_object(self):
        curr_user = self.kwargs.get('pk')
        check = self.request.user
        if curr_user != check:
            return Response([{
                'Error': 'Invalid credentials'
            }])
        noti = Notifications.objects.get(id=self.kwargs.get('num'))
        if not noti:
            return Response([{
                "Error": "Does not exist"
            }])
        if noti.recipient != curr_user:
            return Response([{
                "Error": "Not your notification"
            }])
        return noti


class UpdateNotificationRead(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        noti = Notifications.objects.get(id=pk)
        recipient = noti.recipient
        if request.user != recipient:
            return Response([{
                "Error": "Not your notification"
            }])
        noti.is_read = not noti.is_read
        return HttpResponse(status=200)


class CreateNotification(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Notifications
