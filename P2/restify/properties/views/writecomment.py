from properties.models import Comments, Reservation, CustomUser, Property
from properties.serializers import CommentsSerializer
from django.shortcuts import get_object_or_404
from datetime import datetime
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView, CreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated


class CreateComment(CreateAPIView):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, pk):
        comment_type = request.data.get('comment_type')
        is_root = request.data.get('is_root')
        if comment_type:  # Is a property comment
            if is_root:
                user = request.user
                property = get_object_or_404(Property, id=pk)
                status = ['term', 'comp']
                user_reservations = user.reservations.all().filter(status__in=status)
                valid_stay = user_reservations.filter(property=property)
                if not valid_stay:
                    return Response({
                        "Details": "No valid reservation"
                    })
                user_comments = user.my_comments.all().filter(
                    is_root_comment=True).filter(property=property)
                if len(valid_stay) >= len(user_comments):
                    return Response({
                        "Details": "Max number of comments reached for this property"
                    })

                new_comment = Comments.objects.create(author=user, comment_type=comment_type, is_root_comment=is_root,
                                                      child_comment=None, comment_text=request.data.get('message'),
                                                      created_at=datetime.now(), related_property=property,
                                                      related_user=None, parent_comment=None)
                new_comment = CommentsSerializer(new_comment).data
                return Response(new_comment)
            else:  # is a reply
                user = request.user
                property = get_object_or_404(Property, id=pk)
                parent_comment = Comments.objects.get(
                    parent_comment=request.data.get('parent'))
                if parent_comment.author == user:
                    return Response({
                        "Details": "Cannot comment consecutively"
                    })
                new_comment = Comments.objects.create(author=user, comment_type=comment_type, is_root_comment=is_root,
                                                      child_comment=None, comment_text=request.data.get('message'),
                                                      created_at=datetime.now(), related_property=property,
                                                      related_user=None, parent_comment=parent_comment)
                new_comment = CommentsSerializer(new_comment).data
                return Response(new_comment)

        else:
            # No replies, only parent comments
            host = request.user
            user = CustomUser.objects.get(id=pk)
            properties = host.properties.all()
            reservations = properties.reservations.all()
            reservations = reservations.filter(user=user).filter(status='comp')
            if not reservations:
                return Response({
                    "Details": "User has not completed a reservation at your properties"
                })
            past_comments = Comments.objects.all().filter(author=host)
            past_comments = past_comments.filter(comment_type=comment_type)
            past_comments = past_comments.filter(related_user=user)
            if len(past_comments) >= len(reservations):
                return Response({
                    "Details": "Already commented on this user"
                })
            new_comment = Comments.objects.create(author=user, comment_type=comment_type, is_root_comment=is_root,
                                                  child_comment=None, comment_text=request.data.get('message'),
                                                  created_at=datetime.now(), related_property=None,
                                                  related_user=user, parent_comment=None)
            new_comment = CommentsSerializer(new_comment).data
            return Response(new_comment)
