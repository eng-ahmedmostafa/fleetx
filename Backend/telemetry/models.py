from django.db import models

class TelemetryLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    vehicle_id = models.CharField(max_length=50)  # ID يجي من الجهاز أو كود العربية
    gps_lat = models.FloatField()
    gps_long = models.FloatField()
    speed = models.FloatField()
    engine_temp = models.FloatField()
    fuel_level = models.FloatField()
    tire_pressure = models.FloatField()

    def __str__(self):
        return f"{self.vehicle_id} @ {self.timestamp}"
