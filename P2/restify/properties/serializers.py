from rest_framework.serializers import StringRelatedField
from properties.models import Property, PropertyImages, Reservation, amenities, Notifications, \
    Comments
from rest_framework.serializers import ModelSerializer, SerializerMethodField, ImageField
from rest_framework import fields


class PropertyImageSerializer(ModelSerializer):
    # owner = Property(read_only=True) Commented out because it was causing an error - girish
    # replaced with the line below
    owner = StringRelatedField(read_only=True)
    image_url = SerializerMethodField('get_image_url')
    # image = ImageField(
    #     max_length=None, use_url=True
    # )

    class Meta:
        model = PropertyImages
        fields = ['owner', 'image', 'image_url']  # , 'image_url'

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)


class PropertySerializer(ModelSerializer):
    # images = SerializerMethodField('image_serializer')
    images = PropertyImageSerializer(many=True, read_only=True)
    amenities = fields.MultipleChoiceField(choices=amenities)

    # def image_serializer(self):
    #     images = PropertyImages.objects.filter(owner=self.id)
    #     return PropertyImageSerializer(images).data

    class Meta:
        model = Property
        fields = ['owner',
                  "property_name",
                  'address',
                  'group_size',
                  'number_of_beds',
                  'number_of_baths',
                  'date_created',
                  'price_night',
                  'amenities',
                  'description',
                  'images',
                  ]


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
