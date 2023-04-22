from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from properties.models import Property
from properties.serializers import PropertySerializer
from properties.pagination import StandardResultsSetPagination

class SearchProperties(APIView):
    def get(self, request, *args, **kwargs):
        # Get the queryset based on request data
        # queryset = self.get_queryset(request.data)
        queryset = self.get_queryset(request)

        # Paginate the queryset
        paginator = StandardResultsSetPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        # Serialize the paginated queryset
        serializer = PropertySerializer(paginated_queryset, many=True)

        # Return the paginated and serialized queryset as response
        return paginator.get_paginated_response(serializer.data)

    def get_queryset(self, data):
        properties = Property.objects.all()

        # Get filters from request data
        location = data.query_params.get('location')
        startDate = data.query_params.get('startDate')
        endDate = data.query_params.get('endDate')
        minPrice = data.query_params.get('minPrice')
        maxPrice = data.query_params.get('maxPrice')
        guests = data.query_params.get('guests')
        beds = data.query_params.get('beds')
        baths = data.query_params.get('baths')
        amenities = data.query_params.get('amenities')
        sortMethod = data.query_params.get('sortMethod')

        # Apply filters
        if location:
            properties = properties.filter(address__icontains=location)

        if startDate and endDate:
            properties = properties.exclude(
                reservations__start_date__lte=endDate,
                reservations__end_date__gte=startDate
            )

        if minPrice:
            properties = properties.filter(price_night__gte=minPrice)

        if maxPrice:
            properties = properties.filter(price_night__lte=maxPrice)

        if guests:
            properties = properties.filter(group_size__gte=guests)

        if beds:
            properties = properties.filter(number_of_beds__gte=beds)

        if baths:
            properties = properties.filter(number_of_baths__gte=baths)


        if amenities:
            amenities_list = amenities.split(',')
            for amenity in amenities_list:
                properties = properties.filter(amenities=amenity)

        

        # Apply sorting
        if sortMethod:
            if sortMethod == 'price_asc':
                properties = properties.order_by('price_night')
            elif sortMethod == 'price_desc':
                properties = properties.order_by('-price_night')
            elif sortMethod == 'group_size_asc':
                properties = properties.order_by('group_size')
            elif sortMethod == 'group_size_desc':
                properties = properties.order_by('-group_size')

        return properties
