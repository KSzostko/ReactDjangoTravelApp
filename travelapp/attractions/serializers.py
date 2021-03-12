from rest_framework import serializers
from .models import Attraction


class AttractionSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    # not sure whether received url will be enough
    # will find out after trying to use the data
    def get_photo(self, instance):
        return instance.photo.url

    class Meta:
        model = Attraction
        fields = ('name', 'description', 'photo')
