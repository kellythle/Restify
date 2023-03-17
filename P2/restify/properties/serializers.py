from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import fields
from properties.models import Property, PropertyImages, amenities


class PropertySerializer(ModelSerializer):
    images = SerializerMethodField('image_serializer')
    amenities = fields.MultipleChoiceField(choices=amenities)

    def image_serializer(self):
        images = PropertyImages.objects.filter(owner=self.id)
        return PropertyImageSerializer(images).data

    class Meta:
        model = Property
        exclude = ['amenities']


class PropertyImageSerializer(ModelSerializer):
    owner = PropertySerializer(read_only=True)

    class Meta:
        model = PropertyImages
        fields = ['image']
