from django.db import models


class Hotel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    stars = models.IntegerField()

    def __str__(self):
        return f'Hotel {self.name} with {self.stars} stars'

    class Meta:
        ordering = ['name']
