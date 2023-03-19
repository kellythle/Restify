from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import fields
from properties.models import Property, PropertyImages, Reservation, amenities


class PropertySerializer(ModelSerializer):
    images = SerializerMethodField('image_serializer')
    amenities = fields.MultipleChoiceField(choices=amenities)

    def image_serializer(self):
        images = PropertyImages.objects.filter(owner=self.id)
        return PropertyImageSerializer(images).data

    class Meta:
        model = Property
        exclude = []


class PropertyImageSerializer(ModelSerializer):
    owner = PropertySerializer(read_only=True)

    class Meta:
        model = PropertyImages
        fields = ['image']


class ReservationSerializer(ModelSerializer):

    class Meta:
        model = Reservation
        fields = ['user', 'property', 'start_date',
                  'end_date', 'message', 'status']
