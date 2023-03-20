from django.db import models
from accounts.models import CustomUser
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField
from multiselectfield.validators import MaxValueMultiFieldValidator
from django.conf import settings

# Create your models here.

amenities = (
    (1, 'Laundry'),
    (2, 'Parking'),
    (3, 'Room Service'),
    (4, 'Swimming Pool'),
    (5, 'Gym'),
    (6, 'Breakfast included'),
    (7, "Late Checkout")
)


class Property(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties')
    property_name = models.CharField(max_length=500, null=False)
    address = models.CharField(max_length=500, null=False)
    group_size = models.PositiveIntegerField(null=False)
    number_of_beds = models.PositiveIntegerField(null=False)
    number_of_baths = models.PositiveIntegerField(null=False)
    date_created = models.DateField(null=False)
    price_night = models.FloatField(null=False)
    # availability = models.
    amenities = MultiSelectField(choices=amenities, validators=[
                                 MaxValueMultiFieldValidator(7)], default=[])
    description = models.CharField(max_length=2000)


class PropertyImages(models.Model):
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name='property_images')
    image = models.ImageField(null=False)
    image_url = models.CharField(max_length=2000)


notifications = {
    1: "Host new reservation",
    2: "Host cancellation request",
    3: "Guest approved reservation",
    4: "Guest approved cancellation"
}


class Notifications(models.Model):
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profilenotis')
    recipient_is_host = models.BooleanField(null=False)
    reservation = models.ForeignKey('Reservation', on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)

    notification_type = models.IntegerField()


class Reservation(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reservations')
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name='reservations')
    start_date = models.DateField()
    end_date = models.DateField()
    message = models.CharField(max_length=500)

    PENDING = 'pend'
    DENIED = 'deni'
    EXPIRED = 'expi'
    APPROVED = 'appr'
    CANCELED = 'canc'
    TERMINATED = 'term'
    COMPLETED = 'comp'
    STATES = (
        (PENDING, 'pend'),
        (DENIED, 'deni'),
        (EXPIRED, 'expi'),
        (APPROVED, 'appr'),
        (CANCELED, 'canc'),
        (TERMINATED, 'term'),
        (COMPLETED, 'comp'),
    )
    status = models.CharField(max_length=4, choices=STATES, default=PENDING)


class Comments(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment_type = models.BooleanField(null=False)  # 0 is user, 1 is property
    is_root_comment = models.BooleanField(null=False)  # 0 is reply, 1 is root
    parent_comment = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True)
    comment_text = models.CharField(max_length=300)
    created_at = models.DateTimeField()
    related_reservation = models.ForeignKey(
        Reservation, on_delete=models.CASCADE)
