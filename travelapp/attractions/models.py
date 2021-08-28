from django.db import models


class Attraction(models.Model):
    id = models.AutoField(primary_key=True)
    xid = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=300)
    lat = models.FloatField()
    lng = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
