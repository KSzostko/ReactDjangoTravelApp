from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Attraction
from .serializers import AttractionSerializer


class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['GET'], url_path='search-by-xid')
    def search_by_xid(self, request, pk=None):
        try:
            attraction = self.get_queryset().get(xid=pk)
            serializer = self.get_serializer(attraction)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Attraction.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)
