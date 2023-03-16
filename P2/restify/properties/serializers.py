from rest_framework.serializers import ModelSerializer, SerializerMethodField
from properties.models import Property, PropertyImages


class PropertySerializer(ModelSerializer):
    images = SerializerMethodField('image_serializer')

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
