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
