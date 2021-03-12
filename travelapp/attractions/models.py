from django.db import models


class Attraction(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    # maybe list of images later on
    # TODO: add support for images
    # photo = models.ImageField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
