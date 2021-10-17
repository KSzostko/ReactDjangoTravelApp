from django.db.models.functions import Lower
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Travel, TravelPhoto, TravelStop, TravelRoute
from .serializers import TravelSerializer, TravelPhotoSerializer, TravelStopSerializer, TravelRouteSerializer


class TravelViewSet(viewsets.ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class TravelPhotoViewSet(viewsets.ModelViewSet):
    queryset = TravelPhoto.objects.all()
    serializer_class = TravelPhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(taken_by=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()

        try:
            sort_field = self.request.query_params.get('sortBy')
            if sort_field is None or sort_field == '':
                return qs

            if sort_field == 'title':
                return qs.order_by(Lower('title'))

            return qs.order_by(sort_field)
        except TypeError:
            return qs
        except ValueError:
            return qs


class TravelStopViewSet(viewsets.ModelViewSet):
    queryset = TravelStop.objects.all()
    serializer_class = TravelStopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        try:
            travel_id = int(self.request.query_params.get('travel-id'))

            return qs.filter(travel_id=travel_id)
        except TypeError:
            return qs
        except ValueError:
            return qs


class TravelRouteViewSet(viewsets.ModelViewSet):
    queryset = TravelRoute.objects.all()
    serializer_class = TravelRouteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        try:
            travel_id = int(self.request.query_params.get('travel-id'))

            return qs.filter(start__travel_id=travel_id)
        except TypeError:
            return qs
        except ValueError:
            return qs

    @action(detail=True, methods=['GET'], url_path='route-with-stop')
    def route_with_stop(self, request, pk=None):
        travel_stop = get_object_or_404(TravelStop.objects.all(), pk=pk)

        role = self.request.query_params.get('role')
        if role != 'start' and role != 'destination':
            raise NotFound(detail='Correct role is required', code=400)

        if role == 'start':
            try:
                route = self.get_queryset().get(start=travel_stop)
                serializer = self.get_serializer(route)

                return Response(serializer.data, status=status.HTTP_200_OK)
            except TravelRoute.DoesNotExist:
                return Response(status=status.HTTP_204_NO_CONTENT)

        try:
            route = self.get_queryset().get(destination=travel_stop)
            serializer = self.get_serializer(route)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except TravelRoute.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)
