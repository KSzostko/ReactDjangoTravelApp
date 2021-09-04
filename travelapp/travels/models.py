from django.db import models
from django.contrib.auth.models import User
from hotels.models import Hotel
from attractions.models import Attraction


class Travel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    short_description = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class TravelPhoto(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='travels/', default='no-photo-available.png')
    travel = models.ForeignKey(Travel, related_name='images', on_delete=models.CASCADE)
    taken_by = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f'An image showing {self.travel.name} travel'


class TravelStop(models.Model):
    id = models.AutoField(primary_key=True)
    travel = models.ForeignKey(Travel, on_delete=models.CASCADE)
    attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f'Travel stop in the {self.attraction.name} from the travel {self.travel.name}'


# TODO think about this model structure
# maybe a better idea is just to have here travel foreign key and just one big polyline for each travel
# or different polyline for each day
# calculation between two stops can be made only to receive earliest time for on of the stops
# and this doesn't have to go to the db
# on the other hand wit this approach there cannot be different types of transport involved
class TravelRoute(models.Model):
    id = models.AutoField(primary_key=True)
    start = models.ForeignKey(TravelStop, on_delete=models.CASCADE, related_name='route_start')
    destination = models.ForeignKey(TravelStop, on_delete=models.CASCADE, related_name='route_destination')
    transport = models.CharField(max_length=100)
    distance = models.IntegerField()
    travel_time = models.IntegerField()
    polyline = models.CharField(max_length=100)

    def __str__(self):
        return f'Route from {self.start.attraction.name} to the {self.destination.attraction.name}'
