import json
import django
import os
import paho.mqtt.client as mqtt

# إعداد Django داخل سكريبت خارجي
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fleet_backend.settings")
django.setup()

from telemetry.models import TelemetryLog

# معالجة الرسالة المستلمة
def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode())
        TelemetryLog.objects.create(
            vehicle_id=data["vehicle_id"],
            gps_lat=data["gps_lat"],
            gps_long=data["gps_long"],
            speed=data["speed"],
            engine_temp=data["engine_temp"],
            fuel_level=data["fuel_level"],
            tire_pressure=data["tire_pressure"]
        )
        print(f"✅ Data saved from {data['vehicle_id']}")
    except Exception as e:
        print(f"❌ Error processing message: {e}")

# إعداد عميل MQTT
client = mqtt.Client()
client.on_message = on_message

# الاتصال بالـ Broker العام (ممكن تغيره لـ local)
client.connect("broker.hivemq.com", 1883, 60)

# الاشتراك في التوبيك
client.subscribe("fleet/telemetry")

# بدء الحلقة
print("🚀 MQTT Client is listening on 'fleet/telemetry'...")
client.loop_forever()
