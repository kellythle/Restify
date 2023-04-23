from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from properties.models import Property, PropertyImages, Amenities
from properties.serializers import PropertySerializer, PropertyImageSerializer
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView


class EditProperty(UpdateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])

    def partial_update(self, request, pk):
        if not Property.objects.filter(id=pk).exists():
            return Response({
                "Error": "Property doesn't exist"
            })
        property = self.get_object()
        prop_owner = property.owner
        if request.user.id != prop_owner.id:
            return Response([{
                'Error': 'Permission denied.'
            }], status=403)
        data = request.data
        amenities = data.get('amenities')
        if amenities:
            amenities = amenities.split(',')
            property.amenities.clear()
            for amenity in amenities:
                property.amenities.add(Amenities.objects.get(id=amenity))
        return super().partial_update(request, pk)


class EditPropertyImages(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertyImageSerializer

    def partial_update(self, request, pk):
        property = get_object_or_404(Property, id=pk)
        owner = property.owner
        if request.user != owner:
            return Response([{
                "Error": "Incorrect credentials."
            }], status=401)
        if not property:
            return Response([{
                'details': 'Property either doesn\'t exist or doesn\'t belong to you'
            }], status=403)
        images = request.FILES.getlist('image')
        PropertyImages.objects.all().filter(property=property).delete()
        print(images)
        for i in images:
            img = PropertyImages.objects.create(
                property=property, image=i)
            img.image_url = img.image.path
            img.save()
        return Response({
            "Details": "Update successful"
        })
