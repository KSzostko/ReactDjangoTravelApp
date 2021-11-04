from rest_framework import serializers
from .models import Travel, TravelPhoto, TravelStop, TravelRoute


class DateRangeSerializer(serializers.Serializer):
    start = serializers.DateField()
    end = serializers.DateField()


class TravelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = '__all__'


class TravelPhotoSerializer(serializers.ModelSerializer):
    taken_by_username = serializers.ReadOnlyField(source='taken_by.username')

    class Meta:
        model = TravelPhoto
        fields = '__all__'


class TravelStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelStop
        fields = '__all__'
        depth = 1

    # probably depth dynamic change is not the most optimal
    # but it is the quickest working solution for now
    def __init__(self, *args, **kwargs):
        super(TravelStopSerializer, self).__init__(*args, **kwargs)

        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1


class TravelRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelRoute
        fields = '__all__'
