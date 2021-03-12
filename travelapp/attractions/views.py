from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Attraction
from .serializers import AttractionSerializer


class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
    # TODO: think about proper permissions
    permission_classes = [permissions.AllowAny]
