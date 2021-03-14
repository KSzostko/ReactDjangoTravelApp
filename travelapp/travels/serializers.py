from rest_framework import serializers
from .models import Travel, TravelImage


class TravelSerializer(serializers.ModelSerializer):
    images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Travel
        fields = ['id', 'name', 'short_description', 'description', 'start_date', 'end_date', 'transport', 'hotel', 'attractions', 'images']
        depth = 1


class TravelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelImage
        fields = '__all__'
