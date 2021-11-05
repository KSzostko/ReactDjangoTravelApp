from datetime import datetime
from django.db.models.functions import Lower
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Travel, TravelPhoto, TravelStop, TravelRoute
from .serializers import TravelSerializer, TravelPhotoSerializer, TravelStopSerializer, TravelRouteSerializer, DateRangeSerializer
from .utils import convert_to_date


class TravelViewSet(viewsets.ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()

        try:
            name = self.request.query_params.get('name')
            start_date = self.request.query_params.get('start')
            end_date = self.request.query_params.get('end')
            sort_field = self.request.query_params.get('sortBy')

            filters = {}
            order_by = ''

            if sort_field and sort_field != '':
                order_by = sort_field

            if name and name != '':
                filters['name__icontains'] = name

            if start_date and start_date != '' and end_date and end_date != '':
                filters['start_date__range'] = [start_date, end_date]
                filters['end_date__range'] = [start_date, end_date]

            if order_by == '':
                return qs.filter(**filters)

            if order_by == 'name':
                return qs.filter(**filters).order_by(Lower('name'))

            return qs.filter(**filters).order_by(order_by)
        except TypeError:
            return qs
        except ValueError:
            return qs

    """
    Returns two dates: earliest and latest date with any stop for the given travel.
    If there are no stops in travel yet, travel start and end date are returned.
    """
    @action(detail=True, methods=['GET'], url_path='period')
    def period(self, request, pk=None):
        travel = get_object_or_404(Travel.objects.all(), pk=pk)
        travel_stops = TravelStop.objects.filter(travel=travel).order_by('start_date')

        start = travel.start_date
        end = travel.end_date

        if travel_stops.count():
            start_date_time = travel_stops[0].start_date
            end_date_time = travel_stops[travel_stops.count() - 1].start_date

            start = convert_to_date(start_date_time)
            end = convert_to_date(end_date_time)

        serializer = DateRangeSerializer({'start': start, 'end': end})
        return Response(serializer.data, status=status.HTTP_200_OK)


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
