from rest_framework import serializers
from .models import Travel, TravelPhoto, TravelStop, TravelRoute


class TravelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = '__all__'


class TravelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelPhoto
        fields = '__all__'


class TravelStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelStop
        fields = '__all__'


class TravelRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelRoute
        fields = '__all__'
