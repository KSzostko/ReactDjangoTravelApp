from rest_framework import routers
from .views import TravelViewSet, TravelPhotoViewSet, TravelStopViewSet, TravelRouteViewSet

router = routers.DefaultRouter()

router.register('api/travels', TravelViewSet, 'travels')
router.register('api/travel-photos', TravelPhotoViewSet, 'travel-images')
router.register('api/travel-stops', TravelStopViewSet, 'travel-stops')
router.register('api/travel-routes', TravelRouteViewSet, 'travel-routes')

urlpatterns = router.urls
