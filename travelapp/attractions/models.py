from django.db import models


class Attraction(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    description = models.TextField()
    # maybe list of images later on
    photo = models.ImageField(upload_to='attractions/', default='no-photo-available.png')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
