from rest_framework import routers
from .views import TravelViewSet, TravelImageViewSet

router = routers.DefaultRouter()

router.register('api/travels', TravelViewSet, 'travels')
router.register('api/travel-images', TravelImageViewSet, 'travel-images')

urlpatterns = router.urls
