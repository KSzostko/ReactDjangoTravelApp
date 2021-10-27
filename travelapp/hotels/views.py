from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hotel
from .serializers import HotelSerializer


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['GET'], url_path='search-by-xid')
    def search_by_xid(self, request, pk=None):
        try:
            hotel = self.get_queryset().get(xid=pk)
            serializer = self.get_serializer(hotel)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hotel.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)

