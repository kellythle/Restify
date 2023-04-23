from django.shortcuts import get_object_or_404
from properties.models import Property, PropertyImages
from properties.serializers import PropertySerializer, PropertyImageSerializer
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class ReadProperty(APIView):
    # serializer_class = PropertySerializer
    permission_classes = [AllowAny]

    def get(self, request, pk):
        ob = get_object_or_404(Property, id=self.kwargs.get('pk'))
        images = PropertyImages.objects.all().filter(property=ob)
        ob = Response(PropertySerializer(ob).data)
        # print(images[0].image_url)
        ob.data['images'] = ["http://localhost:8000/media/" +
                             image.image_url.split("/")[-1] + "/" for image in images]
        return ob
