import os
import pickle

BASE_DIR = os.path.dirname(__file__)

def load_model(filename):
    path = os.path.join(BASE_DIR, 'models', filename)
    with open(path, 'rb') as f:
        return pickle.load(f)

# ✅ تحميل الموديلات
model_maintenance_required = load_model("M1_maintenance_required_model.pkl")
model_maintenance_cost = load_model("M2_maintenance_cost_model.pkl")
#model_engine_condition = load_model("M3_Engin_Condition_analysis_ML.pkl")
#model_vehicle_condition = load_model("M4_Vehicle_condtion_analysis.pkl")
