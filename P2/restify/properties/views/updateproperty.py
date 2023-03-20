from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from properties.models import Property, PropertyImages, Amenities
from properties.serializers import PropertySerializer, PropertyImageSerializer
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView


class EditProperty(UpdateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    # def put(self, request):
    #     prop_owner = get_object_or_404(Property, id=self.kwargs.get('pk'))
    #     if request.user.id != prop_owner.id:
    #         return Response([{
    #             'details': 'Permission denied'
    #         }])

    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])

    def partial_update(self, request, pk):
        property = self.get_object()
        prop_owner = property.owner
        if request.user.id != prop_owner.id:
            return Response([{
                'details': 'Permission denied'
            }])
        data = request.data
        amenities = data.get('amenities')
        if amenities:
            amenities = amenities.split(',')
            property.amenities.clear()
            for amenity in amenities:
                property.amenities.add(Amenities.objects.get(id=amenity))
            # del data['amenities']
        return super().partial_update(request, pk)


class EditPropertyImages(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertyImageSerializer

    # def get(self, request, pk):
    #     owner_props = Property.objects.all().filter(owner=request.get('id'))
    #     property = owner_props.get(id=pk)
    #     images = PropertyImages.objects.all()
    #     images = images.filter(property=property.id)
    #     return Response([
    #         {
    #             'image': image
    #         }
    #         for image in images])

    def partial_update(self, request, pk):
        # sent_prop = get_object_or_404(Property, id=pk)
        # owner_props = Property.objects.all().filter(property=sent_prop)
        property = get_object_or_404(Property, id=pk)
        owner = property.owner
        if request.user != owner:
            return Response({
                "Error": "Incorrect credentials"
            })
        if not property:
            return Response([{
                'details': 'Property either doesn\'t exist or doesn\'t belong to you'
            }])
        # images = PropertyImages.objects.all()
        # images = images.filter(property=property)
        # if not images:
        #     return Response([{
        #         'images': 'Wrong images'
        #     }])
        images = request.FILES.getlist('image')
        PropertyImages.objects.all().filter(property=property).delete()
        for i in images:
            img = PropertyImages.objects.create(
                property=property, image=i)
            img.image_url = img.image.path
            img.save()
        return Response({
            "Details": "Update successful"
        })
