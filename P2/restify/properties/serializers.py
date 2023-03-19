from rest_framework.serializers import StringRelatedField
from properties.models import Property, PropertyImages, Reservation, amenities, Notifications, \
    Comments
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import fields


class PropertyImageSerializer(ModelSerializer):
    # owner = Property(read_only=True) Commented out because it was causing an error - girish
    # replaced with the line below
    owner = StringRelatedField(read_only=True)

    class Meta:
        model = PropertyImages
        fields = ['image']


class PropertySerializer(ModelSerializer):
    # images = SerializerMethodField('image_serializer')
    images = PropertyImageSerializer(many=True)
    amenities = fields.MultipleChoiceField(choices=amenities)

    # def image_serializer(self):
    #     images = PropertyImages.objects.filter(owner=self.id)
    #     return PropertyImageSerializer(images).data

    class Meta:
        model = Property
        exclude = []


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notifications
        exclude = []


class CommentsSerializer(ModelSerializer):
    class Meta:
        model = Comments
        exclude = []


class ReservationSerializer(ModelSerializer):

    class Meta:
        model = Reservation
        fields = ['user', 'property', 'start_date',
                  'end_date', 'message', 'status']
