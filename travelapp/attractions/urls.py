from rest_framework import routers
from .views import AttractionViewSet

router = routers.DefaultRouter()
router.register('api/attractions', AttractionViewSet, 'attractions')

urlpatterns = router.urls
