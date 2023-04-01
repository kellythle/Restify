from properties.models import Comments, Reservation, CustomUser, Property
from properties.serializers import CommentsSerializer
from django.shortcuts import get_object_or_404
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView, CreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated


class CreatePropertyComment(CreateAPIView):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, pk):
        user = request.user
        property = get_object_or_404(Property, id=pk)
        status = ['term', 'comp']
        user_reservations = user.reservations.all().filter(status__in=status)
        valid_stay = user_reservations.filter(property=property)
        if not valid_stay:
            return Response({
                "Error": "No valid reservation"
            }, status=403)
        user_comments = user.my_comments.all().filter(
            is_root_comment=True).filter(related_property=property)
        if len(valid_stay) <= len(user_comments):
            return Response({
                "Error": "Max number of comments reached for this property"
            }, status=403)

        new_comment = Comments.objects.create(author=user, comment_type=1, is_root_comment=1,
                                              child_comment=None, comment_text=request.data.get('message'),
                                              created_at=datetime.now(), related_property=property,
                                              related_user=None, parent_comment=None)
        new_comment = CommentsSerializer(new_comment).data
        return Response(new_comment)


class CreatePropertyResponseComment(CreateAPIView):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, pk):
        user = request.user
        property = get_object_or_404(Property, id=pk)
        parent_comment = Comments.objects.get(id=request.data.get('parent'))
        if parent_comment.author == user:
            return Response({
                "Error": "You cannot comment consecutively."
            }, status=403)
        if parent_comment.child_comment:
            return Response({
                "Error": "You have already responded to the latest comment."
            }, status=403)
        new_comment = Comments.objects.create(author=user, comment_type=1, is_root_comment=0,
                                              child_comment=None, comment_text=request.data.get('message'),
                                              created_at=datetime.now(), related_property=property,
                                              related_user=None, parent_comment=parent_comment)
        parent_comment.child_comment = new_comment
        parent_comment.save()
        new_comment = CommentsSerializer(new_comment).data
        return Response(new_comment)


class CreateUserComment(CreateAPIView):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, pk):
        host = request.user
        user = CustomUser.objects.get(id=pk)
        comment_type = 0
        is_root = 1
        # properties = host.properties.all()
        # reservations = properties.reservation.all()
        # reservations = reservations.filter(user=user).filter(status='comp')
        reservations = Reservation.objects.filter(
            property__owner=host, user=user, status='comp')
        if not reservations:
            return Response({
                "Error": "User has not completed a reservation at your properties"
            }, status=403)
        past_comments = Comments.objects.filter(
            author=host, comment_type=comment_type, related_user=user)
        # past_comments = past_comments.filter(comment_type=comment_type)
        # past_comments = past_comments.filter(related_user=user)
        if len(past_comments) >= len(reservations):
            return Response({
                "Error": "Already commented on this user"
            }, status=403)
        new_comment = Comments.objects.create(author=host, comment_type=comment_type, is_root_comment=is_root,
                                              child_comment=None, comment_text=request.data.get('message'),
                                              created_at=datetime.now(), related_property=None,
                                              related_user=user, parent_comment=None)
        new_comment = CommentsSerializer(new_comment).data
        return Response(new_comment)
