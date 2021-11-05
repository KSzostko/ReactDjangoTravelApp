import datetime
from django.contrib.auth.models import User
from django.utils.timezone import make_aware
from django.urls import reverse
from django.test import TestCase
from django.db.models.functions import Lower
from rest_framework import status
from travels.models import Travel, TravelStop
from attractions.models import Attraction
from travels.serializers import TravelSerializer, DateRangeSerializer
from travels.utils import convert_to_date


def login_user(client):
    login_resp = client.post(reverse('knox_login'), {'username': 'testuser', 'password': 'password'})
    return login_resp.data['token']


class GetTravelsTest(TestCase):
    """ Test module for GET travels list API """
    def setUp(self):
        User.objects.create_user(username='testuser', password='password')
        Travel.objects.create(
            name='Travel #1',
            short_description='short description',
            description='description',
            start_date=datetime.date(2021, 8, 17),
            end_date=datetime.date(2021, 9, 1)
        )
        Travel.objects.create(
            name='new travel #2',
            short_description='short description',
            description='description',
            start_date=datetime.date(2021, 8, 19),
            end_date=datetime.date(2021, 8, 22)
        )
        Travel.objects.create(
            name='new Travel #3',
            short_description='short description',
            description='description',
            start_date=datetime.date(2021, 10, 17),
            end_date=datetime.date(2021, 10, 1)
        )

    def test_get_all_travels_returns_unauthorized(self):
        response = self.client.get(reverse('travels-list'))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_travels_authorized(self):
        token = login_user(self.client)
        response = self.client.get(reverse('travels-list'), **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all()
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_all_travels_sorted_by_name_case_insensitive(self):
        token = login_user(self.client)
        response = self.client.get('/api/travels/?sortBy=name', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all().order_by(Lower('name'))
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_all_travels_sorted_by_start_date_asc(self):
        token = login_user(self.client)
        response = self.client.get('/api/travels/?sortBy=-start_date', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all().order_by('-start_date')
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_all_travels_sorted_by_start_date_desc(self):
        token = login_user(self.client)
        response = self.client.get('/api/travels/?sortBy=start_date', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all().order_by('start_date')
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_all_travels_filtered_by_name(self):
        token = login_user(self.client)
        response = self.client.get('/api/travels/?name=new', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all().filter(name__icontains='new')
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data, serializer.data)

    def test_get_all_travels_filtered_by_date_range(self):
        token = login_user(self.client)
        start_date = '2021-8-18'
        end_date = '2021-8-23'
        response = self.client.get(f'/api/travels/?start={start_date}&end={end_date}', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all().filter(start_date__range=[start_date, end_date], end_date__range=[start_date, end_date])
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data, serializer.data)

    def test_get_all_travels_filtered_by_date_and_name_simultaneously(self):
        token = login_user(self.client)
        name = 'new'
        start_date = '2021-8-15'
        end_date = '2021-9-2'
        response = self.client.get(f'/api/travels/?name={name}&start={start_date}&end={end_date}', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all().filter(
            start_date__range=[start_date, end_date],
            end_date__range=[start_date, end_date],
            name__icontains=name
        )
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data, serializer.data)

    def test_get_all_travels_filtered_and_sorted_simultaneously(self):
        token = login_user(self.client)
        order_by = '-start_date'
        name = 'a'
        start_date = '2021-8-15'
        end_date = '2021-9-2'
        response = self.client.get(f'/api/travels/?sortBy={order_by}&name={name}&start={start_date}&end={end_date}',
                                   **{'HTTP_AUTHORIZATION': 'Token ' + token})

        travels = Travel.objects.all().filter(
            start_date__range=[start_date, end_date],
            end_date__range=[start_date, end_date],
            name__icontains=name
        ).order_by(order_by)
        serializer = TravelSerializer(travels, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data, serializer.data)


class GetPeriodTest(TestCase):
    """ Test module for GET travel period API """
    def setUp(self):
        User.objects.create_user(username='testuser', password='password')
        Travel.objects.create(
            name='Travel #1',
            short_description='short description',
            description='description',
            start_date=datetime.date(2021, 8, 17),
            end_date=datetime.date(2021, 9, 1)
        )
        Attraction.objects.create(
            xid='xid',
            name='attraction',
            type='accommodation',
            lat=33.25,
            lng=21.45,
            description='Decription'
        )

    def test_get_travel_start_and_end_date_when_it_has_no_stops(self):
        token = login_user(self.client)
        travel = Travel.objects.get(name='Travel #1')
        response = self.client.get(f'/api/travels/{travel.id}/period/', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        expected = {'start': travel.start_date, 'end': travel.end_date}
        serializer = DateRangeSerializer(expected, many=False)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_travel_stop_start_and_end_date_when_there_is_one(self):
        token = login_user(self.client)
        travel = Travel.objects.get(name='Travel #1')
        attraction = Attraction.objects.get(name='attraction')
        travel_stop = TravelStop.objects.create(
            travel=travel,
            attraction=attraction,
            start_date=make_aware(datetime.datetime(2021, 8, 19, 8, 0, 0)),
            end_date=make_aware(datetime.datetime(2021, 8, 19, 9, 15, 9)),
        )

        response = self.client.get(f'/api/travels/{travel.id}/period/', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        expected = {'start': convert_to_date(travel_stop.start_date), 'end': convert_to_date(travel_stop.end_date)}
        serializer = DateRangeSerializer(expected, many=False)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_travel_stop_start_and_end_date_when_there_are_multiple(self):
        token = login_user(self.client)
        travel = Travel.objects.get(name='Travel #1')
        attraction = Attraction.objects.get(name='attraction')
        travel_stop1 = TravelStop.objects.create(
            travel=travel,
            attraction=attraction,
            start_date=make_aware(datetime.datetime(2021, 8, 19, 8, 0, 0)),
            end_date=make_aware(datetime.datetime(2021, 8, 19, 9, 15, 9)),
        )
        travel_stop2 = TravelStop.objects.create(
            travel=travel,
            attraction=attraction,
            start_date=make_aware(datetime.datetime(2021, 8, 29, 8, 0, 0)),
            end_date=make_aware(datetime.datetime(2021, 8, 29, 9, 15, 9)),
        )

        response = self.client.get(f'/api/travels/{travel.id}/period/', **{'HTTP_AUTHORIZATION': 'Token ' + token})

        expected = {'start': convert_to_date(travel_stop1.start_date), 'end': convert_to_date(travel_stop2.start_date)}
        serializer = DateRangeSerializer(expected, many=False)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
