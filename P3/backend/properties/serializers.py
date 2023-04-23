from rest_framework.serializers import StringRelatedField
from properties.models import Property, PropertyImages, Reservation, amenities, Notifications, \
    Comments, Amenities
from django.shortcuts import get_object_or_404
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
    amenities = SerializerMethodField('amenity_serializer')

    # def image_serializer(self):
    #     images = PropertyImages.objects.filter(owner=self.id)
    #     return PropertyImageSerializer(images).data

    class Meta:
        model = Property
        fields = ['id',
                  'owner',
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

    def amenity_serializer(self, obj):
        amenities = []
        numbers = obj.amenities.all()
        for amenity in numbers:
            amenities.append(Amenities.objects.get(id=amenity.id).amenity)
        return amenities


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notifications
        exclude = []


class CommentsSerializer(ModelSerializer):
    child_comment = SerializerMethodField()

    class Meta:
        model = Comments
        fields = ['author',
                  'comment_type',  # 0 is user, 1 is property
                  'is_root_comment',  # 0 is reply, 1 is root
                  'parent_comment',
                  'child_comment',
                  'comment_text',
                  'created_at',
                  'related_property',
                  'related_user', ]

    def get_child_comment(self, obj):
        if obj.child_comment:
            return CommentsSerializer(obj.child_comment).data
        else:
            return None


class ReservationSerializer(ModelSerializer):

    class Meta:
        model = Reservation
        fields = ['user', 'name', 'image', 'property', 'start_date',
                  'end_date', 'message', 'status']
