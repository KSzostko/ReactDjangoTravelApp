from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import TravelImage, Travel
from .serializers import TravelSerializer, TravelImageSerializer


class TravelViewSet(viewsets.ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer
    # TODO: think about proper permissions
    permission_classes = [permissions.AllowAny]


class TravelImageViewSet(viewsets.ModelViewSet):
    queryset = TravelImage.objects.all()
    serializer_class = TravelImageSerializer
    # TODO: think about proper permissions
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()

        try:
            travel_id = int(self.request.query_params.get('travel-id'))

            return qs.filter(travel_id=travel_id)
        except TypeError:
            return qs
        except ValueError:
            return qs
