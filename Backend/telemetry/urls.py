from django.urls import path
from .views import LatestTelemetryView, FleetXBrainView

urlpatterns = [
    path('latest/', LatestTelemetryView.as_view(), name='latest-telemetry'),
    path('brain/', FleetXBrainView.as_view(), name='fleetx-brain'),

]
