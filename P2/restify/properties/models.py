from django.db import models
# from accounts.models import User
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField
from multiselectfield.validators import MaxValueMultiFieldValidator

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
        User, on_delete=models.CASCADE, related_name='properties')
    property_name = models.CharField(max_length=500, null=False)
    address = models.CharField(max_length=500, null=False)
    group_size = models.PositiveIntegerField(null=False)
    number_of_beds = models.PositiveIntegerField(null=False)
    number_of_baths = models.PositiveIntegerField(null=False)
    date_created = models.DateField(null=False)
    price_night = models.FloatField(null=False)
    # availability = models.
    amenities = MultiSelectField(choices=amenities, validators=[
                                 MaxValueMultiFieldValidator(8)])
    description = models.CharField(max_length=2000)


class PropertyImages(models.Model):
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name='property_images')
    image = models.ImageField(null=False)


notifications = {
    1: "Host new reservation",
    2: "Host cancellation request",
    3: "Guest approved reservation",
    4: "Guest approved cancellation"
}


class Notifications(models.Model):
    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='profilenotis')
    recipient_is_host = models.BooleanField(null=False)
    reservation = models.ForeignKey('Reservation', on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)

    notification_type = models.IntegerField()


class Reservation(models.Model):
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
