
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TelemetryLog
from rest_framework.permissions import IsAuthenticated


class LatestTelemetryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        latest = TelemetryLog.objects.order_by('-timestamp').first()
        if latest:
            return Response({
                "vehicle_id": latest.vehicle_id,
                "timestamp": latest.timestamp,
                "gps_lat": latest.gps_lat,
                "gps_long": latest.gps_long,
                "speed": latest.speed,
                "engine_temp": latest.engine_temp,
                "fuel_level": latest.fuel_level,
                "tire_pressure": latest.tire_pressure
            })
        else:
            return Response({"message": "No data available"}, status=404)


# Create your views here.
from .ml_models import (
    model_maintenance_required,
    model_maintenance_cost,
    #model_engine_condition,
    #model_vehicle_condition
)

from .models import TelemetryLog


class FleetXBrainView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        latest = TelemetryLog.objects.order_by('-timestamp').first()
        if not latest:
            return Response({"error": "No telemetry data found"}, status=404)

        # ✅ إدخال بيانات تجريبية — هنعدلها حسب المعطيات الحقيقية لاحقًا
        input_m1 = [[1, 2, 1, 0.7]]  # Detected Anomalies, Failure History, Downtime, Efficiency
        input_m2 = [[1500, 3, 0.8, 0.6]]  # Load Capacity, Failure History, Score, Efficiency
        input_m3 = [[
            latest.speed,               # rpm (افتراضياً)
            latest.fuel_level,          # fuel pressure
            latest.engine_temp,         # lub oil temp
            latest.tire_pressure        # lub oil pressure
        ]]
        input_m4 = [[1, 0, 0.8]]  # example inputs (تتعدل بعدين)

        try:
            result = {
                "maintenance_required": bool(model_maintenance_required.predict(input_m1)[0]),
                "maintenance_cost": float(model_maintenance_cost.predict(input_m2)[0]),
                #"engine_condition": str(model_engine_condition.predict(input_m3)[0]),
                #"vehicle_condition": str(model_vehicle_condition.predict(input_m4)[0]),
            }
        except Exception as e:
            return Response({"error": f"Prediction failed: {str(e)}"}, status=500)

        return Response(result)