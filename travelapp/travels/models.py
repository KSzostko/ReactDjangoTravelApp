from django.db import models
from travelapp.attractions.models import Attraction
from travelapp.hotels.models import Hotel


TRANSPORT_CHOICES = (
    ('PLANE', 'Plane'),
    ('CAR', 'Car'),
    ('BUS', 'Bus'),
    ('BOAT', 'BOAT'),
    ('PLANE&BUS', 'Plane and Bus'),
    ('PLANE&CAR', 'Plane and Car'),
)


class Travel(models.Model):
    name = models.CharField(max_length=50)
    short_description = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    transport = models.CharField(max_length=30, choices=TRANSPORT_CHOICES, default='PLANE')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    attractions = models.ManyToManyField(Attraction, related_name='attractions')

    class Meta:
        ordering = ['name']


class TravelImage(models.Model):
    image = models.ImageField(upload_to='travels/', default='no-photo-available.png')
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE)
