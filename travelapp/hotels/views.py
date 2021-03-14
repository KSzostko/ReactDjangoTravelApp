from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Hotel
from .serializers import HotelSerializer


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    # TODO: think about proper permissions
    permission_classes = [permissions.AllowAny]
