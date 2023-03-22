from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.models import CustomUser
from properties.models import Property, Comments, Reservation
from properties.serializers import CommentsSerializer
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import ListAPIView  # APIView
# from rest_framework.views import APIView
from django.conf import settings
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ValidationError


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 1000


class GetPropertyCommentThreads(ListAPIView):
    pagination_class = StandardResultsSetPagination
    permission_classes = [AllowAny]
    serializer_class = CommentsSerializer

    def get_queryset(self):
        parent_comments = Comments.objects.all().filter(comment_type=True).filter(
            is_root_comment=True).filter(related_property=self.kwargs.get('pk'))
        return parent_comments


class GetUserCommentThreads(ListAPIView):
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]
    serializer_class = CommentsSerializer

    def get_queryset(self):
        owner = self.request.user
        if owner.isHost:
            user = CustomUser.objects.get(id=self.kwargs.get('pk'))
            status = ['appr', 'comp', 'pend']
            user_reservations = user.reservations.all().filter(status__in=status)
            owner_properties = owner.properties.all()
            overlap = user_reservations.filter(property__in=owner_properties)
            if not overlap:
                return Response({
                    "Error": "No valid users to view."
                }, status=400)
            parent_comments = Comments.objects.all().filter(comment_type=False).filter(
                is_root_comment=True).filter(related_user=self.kwargs.get('pk'))
            return parent_comments
        else:
            raise ValidationError(
                detail="You must be a host to view a user\'s profile comments.", status=403)
