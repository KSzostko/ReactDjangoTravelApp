from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Travel, TravelPhoto, TravelStop, TravelRoute
from .serializers import TravelSerializer, TravelPhotoSerializer, TravelStopSerializer, TravelRouteSerializer


class TravelViewSet(viewsets.ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer
    # TODO: think about proper permissions
    permission_classes = [permissions.AllowAny]


class TravelPhotoViewSet(viewsets.ModelViewSet):
    queryset = TravelPhoto.objects.all()
    serializer_class = TravelPhotoSerializer
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


class TravelStopViewSet(viewsets.ModelViewSet):
    queryset = TravelStop.objects.all()
    serializer_class = TravelStopSerializer
    # TODO: think about proper permissions
    permission_classes = [permissions.AllowAny]


class TravelRouteViewSet(viewsets.ModelViewSet):
    queryset = TravelRoute.objects.all()
    serializer_class = TravelRouteSerializer
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
