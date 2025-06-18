
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <div className="flex items-center justify-center h-full">Loading map...</div>;
    case Status.FAILURE:
      return <div className="flex items-center justify-center h-full text-red-500">Error loading map</div>;
    default:
      return null;
  }
};

const MapComponent: React.FC<{ apiKey: string }> = ({ apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // Cairo coordinates
    const cairoCenter = { lat: 30.0444, lng: 31.2357 };

    map.current = new window.google.maps.Map(mapRef.current, {
      center: cairoCenter,
      zoom: 11,
      mapTypeId: 'roadmap',
    });

    // Fleet vehicle data for Cairo
    const vehicles = [
      { id: 1, lat: 30.0444, lng: 31.2357, status: 'active', name: 'Vehicle 001' },
      { id: 2, lat: 30.0600, lng: 31.2500, status: 'active', name: 'Vehicle 002' },
      { id: 3, lat: 30.0300, lng: 31.2200, status: 'idle', name: 'Vehicle 003' },
      { id: 4, lat: 30.0700, lng: 31.2800, status: 'maintenance', name: 'Vehicle 004' },
      { id: 5, lat: 30.0500, lng: 31.2100, status: 'active', name: 'Vehicle 005' }
    ];

    // Add markers for each vehicle
    vehicles.forEach(vehicle => {
      const color = vehicle.status === 'active' ? '#10b981' : 
                   vehicle.status === 'idle' ? '#f59e0b' : '#ef4444';

      const marker = new window.google.maps.Marker({
        position: { lat: vehicle.lat, lng: vehicle.lng },
        map: map.current,
        title: vehicle.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: system-ui;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${vehicle.name}</h3>
            <p style="margin: 0; color: ${color}; text-transform: capitalize; font-size: 12px;">${vehicle.status}</p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current, marker);
      });
    });

  }, [apiKey]);

  return <div ref={mapRef} className="absolute inset-0 rounded-b-lg" />;
};

// Simple OpenStreetMap-based static map component
const StaticMapView: React.FC = () => {
  const vehicles = [
    { id: 1, x: 50, y: 45, status: 'active', name: 'Vehicle 001' },
    { id: 2, x: 65, y: 30, status: 'active', name: 'Vehicle 002' },
    { id: 3, x: 35, y: 60, status: 'idle', name: 'Vehicle 003' },
    { id: 4, x: 75, y: 25, status: 'maintenance', name: 'Vehicle 004' },
    { id: 5, x: 40, y: 35, status: 'active', name: 'Vehicle 005' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'idle': return '#f59e0b';
      case 'maintenance': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="relative h-[400px] bg-gradient-to-br from-blue-50 to-green-50 rounded-b-lg overflow-hidden">
      {/* Cairo map illustration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50">
        {/* Nile River representation */}
        <div className="absolute top-0 left-1/3 w-2 h-full bg-blue-300 transform -rotate-12 opacity-60"></div>
        
        {/* City areas */}
        <div className="absolute top-1/4 left-1/4 w-20 h-16 bg-gray-200 rounded opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-20 bg-gray-200 rounded opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-12 bg-gray-200 rounded opacity-40"></div>
        
        {/* Roads */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 opacity-30"></div>
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-300 opacity-30"></div>
      </div>

      {/* Vehicle markers */}
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ 
            left: `${vehicle.x}%`, 
            top: `${vehicle.y}%`,
          }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: getStatusColor(vehicle.status) }}
          ></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
              <div className="font-semibold">{vehicle.name}</div>
              <div 
                className="text-xs capitalize"
                style={{ color: getStatusColor(vehicle.status) }}
              >
                {vehicle.status}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Map legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded shadow-md">
        <h4 className="font-medium mb-2 text-sm">Fleet Status</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Maintenance</span>
          </div>
        </div>
      </div>

      {/* Location label */}
      <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded shadow">
        <div className="font-medium text-sm">Cairo, Egypt</div>
        <div className="text-xs text-gray-600">Fleet Overview</div>
      </div>
    </div>
  );
};

const MapView: React.FC = () => {
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadMap = () => {
    if (googleMapsApiKey) {
      setIsMapLoaded(true);
    }
  };

  return (
    <Card className="shadow-md border border-gray-100">
      <Tabs defaultValue="live">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-medium">Fleet Map - Cairo</h3>
          <TabsList>
            <TabsTrigger value="live">Live View</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
          </TabsList>
        </div>
        <CardContent className="p-0">
          <TabsContent value="live" className="mt-0">
            {!isMapLoaded ? (
              <>
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Google Maps API Key (Optional)
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your Google Maps API key for enhanced features"
                        value={googleMapsApiKey}
                        onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Get your API key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>
                      </p>
                    </div>
                    <Button onClick={loadMap} disabled={!googleMapsApiKey}>
                      Load Google Maps
                    </Button>
                  </div>
                </div>
                <StaticMapView />
              </>
            ) : (
              <div className="relative h-[400px] bg-gray-100">
                <Wrapper apiKey={googleMapsApiKey} render={render}>
                  <MapComponent apiKey={googleMapsApiKey} />
                </Wrapper>
              </div>
            )}
          </TabsContent>
          <TabsContent value="routes" className="mt-0">
            <div className="relative h-[400px] bg-gray-100">
              {isMapLoaded ? (
                <Wrapper apiKey={googleMapsApiKey} render={render}>
                  <MapComponent apiKey={googleMapsApiKey} />
                </Wrapper>
              ) : (
                <StaticMapView />
              )}
              <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-md">
                <h4 className="font-medium mb-2">Active Routes</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Route A: Downtown → New Cairo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Route B: Maadi → Heliopolis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Route C: Zamalek → Nasr City</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MapView;
