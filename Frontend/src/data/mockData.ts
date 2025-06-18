
import { ChartBarIcon, MapIcon, CarIcon } from "lucide-react";

// Vehicle statuses
export type VehicleStatus = 'active' | 'inactive' | 'maintenance' | 'issue';

// Vehicle type
export interface Vehicle {
  id: string;
  name: string;
  type: string;
  status: VehicleStatus;
  driver: string;
  location: {
    lat: number;
    lng: number;
  };
  lastUpdate: string;
  fuelLevel: number;
  speed: number;
  distanceTraveled: number;
}

// Fleet metrics type
export interface FleetMetric {
  id: string;
  label: string;
  value: number | string;
  change: number;
  icon: any;
  color: string;
}

// Analytics data type
export interface AnalyticsData {
  label: string;
  fuel: number;
  distance: number;
  maintenance: number;
}

// Mock vehicles data
export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Truck 101',
    type: 'Heavy Truck',
    status: 'active',
    driver: 'John Smith',
    location: { lat: 40.7128, lng: -74.006 },
    lastUpdate: '2 mins ago',
    fuelLevel: 75,
    speed: 65,
    distanceTraveled: 1205,
  },
  {
    id: 'v2',
    name: 'Delivery Van 202',
    type: 'Cargo Van',
    status: 'active',
    driver: 'Sarah Johnson',
    location: { lat: 40.7282, lng: -73.9942 },
    lastUpdate: '5 mins ago',
    fuelLevel: 45,
    speed: 30,
    distanceTraveled: 890,
  },
  {
    id: 'v3',
    name: 'Sedan 303',
    type: 'Car',
    status: 'maintenance',
    driver: 'Robert Davis',
    location: { lat: 40.7053, lng: -73.9980 },
    lastUpdate: '30 mins ago',
    fuelLevel: 20,
    speed: 0,
    distanceTraveled: 2310,
  },
  {
    id: 'v4',
    name: 'Truck 104',
    type: 'Medium Truck',
    status: 'issue',
    driver: 'Emily Wilson',
    location: { lat: 40.7218, lng: -74.0130 },
    lastUpdate: '12 mins ago',
    fuelLevel: 60,
    speed: 0,
    distanceTraveled: 1802,
  },
  {
    id: 'v5',
    name: 'Delivery Van 205',
    type: 'Cargo Van',
    status: 'active',
    driver: 'Michael Brown',
    location: { lat: 40.7328, lng: -74.0060 },
    lastUpdate: '3 mins ago',
    fuelLevel: 90,
    speed: 45,
    distanceTraveled: 560,
  },
];

// Mock fleet metrics
export const fleetMetrics: FleetMetric[] = [
  {
    id: 'active-vehicles',
    label: 'Active Vehicles',
    value: '32/40',
    change: 5,
    icon: CarIcon,
    color: 'bg-blue-50 text-blue-500',
  },
  {
    id: 'reported-issues',
    label: 'Reported Issues',
    value: 8,
    change: -2,
    icon: CarIcon,
    color: 'bg-red-50 text-red-500',
  },
  {
    id: 'avg-fuel',
    label: 'Avg. Fuel Usage',
    value: '8.2 gal/100mi',
    change: -3.5,
    icon: MapIcon,
    color: 'bg-fleetx-lightest text-fleetx-dark',
  },
  {
    id: 'active-drivers',
    label: 'Active Drivers',
    value: 28,
    change: 0,
    icon: ChartBarIcon,
    color: 'bg-yellow-50 text-yellow-600',
  },
];

// Mock analytics data
export const analyticsData: AnalyticsData[] = [
  { label: 'Jan', fuel: 200, distance: 2400, maintenance: 1200 },
  { label: 'Feb', fuel: 180, distance: 1800, maintenance: 800 },
  { label: 'Mar', fuel: 250, distance: 3200, maintenance: 1500 },
  { label: 'Apr', fuel: 280, distance: 3800, maintenance: 1000 },
  { label: 'May', fuel: 220, distance: 3100, maintenance: 1300 },
  { label: 'Jun', fuel: 260, distance: 3600, maintenance: 900 },
  { label: 'Jul', fuel: 300, distance: 4100, maintenance: 1100 },
];

// Vehicle status counts
export const vehicleStatusCounts = {
  active: 32,
  inactive: 5,
  maintenance: 2,
  issue: 1
};

// Mock map data points
export const mapDataPoints = [
  { id: 1, lat: 40.7128, lng: -74.0060, name: 'Vehicle 1', status: 'active' },
  { id: 2, lat: 40.7218, lng: -74.0130, name: 'Vehicle 2', status: 'issue' },
  { id: 3, lat: 40.7282, lng: -73.9942, name: 'Vehicle 3', status: 'active' },
  { id: 4, lat: 40.7053, lng: -73.9980, name: 'Vehicle 4', status: 'maintenance' },
  { id: 5, lat: 40.7328, lng: -74.0060, name: 'Vehicle 5', status: 'active' }
];
