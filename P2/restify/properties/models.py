from django.db import models
from accounts.models import User

# Create your models here.


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
    amenities = models.ManyToManyField('PropertyImages')
    description = models.CharField(max_length=2000)


class PropertyImages(models.Model):
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name='property_images')
    image = models.ImageField(null=False)
