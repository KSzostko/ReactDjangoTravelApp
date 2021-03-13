from django.db import models
from travelapp.attractions.models import Attraction


TRANSPORT_CHOICES = (
    ('PLANE', 'Plane'),
    ('CAR', 'Car'),
    ('BUS', 'Bus'),
    ('BOAT', 'BOAT'),
    ('PLANE&BUS', 'Plane and Bus'),
    ('PLANE&CAR', 'Plane and Car'),
)


class TravelImage(models.Model):
    image = models.ImageField(upload_to='travels/', default='no-photo-available.png')


class Travel(models.Model):
    name = models.CharField(max_length=50)
    short_description = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    transport = models.CharField(max_length=30, choices=TRANSPORT_CHOICES, default='PLANE')
    # foreign key for hotel model
    # hotel = models.CharField(max_length=100)
    attractions = models.ManyToManyField(Attraction, related_name='attractions')
    images = models.ManyToManyField(TravelImage)

    class Meta:
        ordering = ['name']
