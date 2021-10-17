import datetime
from django.test import TestCase
from travels.models import Travel


class TravelTest(TestCase):
    """ Test module for Travel model """
    def setUp(self):
        Travel.objects.create(
            name='Travel #1',
            short_description='short description',
            description='description',
            start_date=datetime.date(2021, 8, 17),
            end_date=datetime.date(2021, 9, 1)
        )

    def test_creating_without_passing_foreign_keys(self):
        travel = Travel.objects.get(name='Travel #1')

        self.assertEqual(travel.name, 'Travel #1')
        self.assertEqual(travel.short_description, 'short description')
        self.assertEqual(travel.description, 'description')
        self.assertEqual(travel.start_date, datetime.date(2021, 8, 17))
        self.assertEqual(travel.end_date, datetime.date(2021, 9, 1))
        self.assertEqual(travel.hotel, None)
        self.assertEqual(travel.creator, None)
