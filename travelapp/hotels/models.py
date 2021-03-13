from django.db import models


class Hotel(models.Model):
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=100)
    description = models.TextField()
    stars = models.IntegerField()
    photo = models.ImageField(upload_to='hotels/', default='no-photo-available.png')
