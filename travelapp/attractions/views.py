from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Attraction
from .serializers import AttractionSerializer


class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        try:
            xid = (self.request.query_params.get('xid'))

            return qs.filter(xid=xid)
        except TypeError:
            return qs
        except ValueError:
            return qs
