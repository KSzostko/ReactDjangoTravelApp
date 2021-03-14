from rest_framework import routers
from .views import HotelViewSet

router = routers.DefaultRouter()
router.register('api/hotels', HotelViewSet, 'hotels')

urlpatterns = router.urls
