import datetime
from django.contrib.auth.models import User
from django.urls import reverse
from django.test import TestCase
from django.db.models.functions import Lower
from rest_framework import status
from travels.models import Travel
from travels.serializers import TravelSerializer


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
        name = '#'
        start_date = '2021-08-15'
        end_date = '2021-09-02'
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
