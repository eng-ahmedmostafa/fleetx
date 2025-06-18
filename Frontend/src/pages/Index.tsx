
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import FleetMetrics from '@/components/Dashboard/FleetMetrics';
import VehicleList from '@/components/Dashboard/VehicleList';
import MapView from '@/components/Dashboard/MapView';
import AnalyticsChart from '@/components/Dashboard/AnalyticsChart';
import FleetBrain from '@/components/Dashboard/FleetBrain';
import { fleetMetrics, vehicles, analyticsData } from '@/data/mockData';
import { Car, ChevronLeft, Map, BarChart, Users, Route, Compass, Settings, FileText } from 'lucide-react';

const Index: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-fleetx-dark transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <div className="flex items-center">
              <span className="text-white font-bold text-xl">Fleet</span>
              <span className="text-fleetx-light font-bold text-xl">X</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden text-white hover:bg-sidebar-accent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-white bg-sidebar-accent hover:bg-sidebar-accent/80" asChild>
                <Link to="/">
                  <BarChart className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-sidebar-accent/50" asChild>
                <Link to="/vehicles">
                  <Car className="mr-2 h-5 w-5" />
                  Vehicles
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-sidebar-accent/50" asChild>
                <Link to="/map">
                  <Map className="mr-2 h-5 w-5" />
                  Map
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-sidebar-accent/50" asChild>
                <Link to="/routes">
                  <Route className="mr-2 h-5 w-5" />
                  Routes
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-sidebar-accent/50" asChild>
                <Link to="/drivers">
                  <Users className="mr-2 h-5 w-5" />
                  Drivers
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-sidebar-accent/50" asChild>
                <Link to="/navigation">
                  <Compass className="mr-2 h-5 w-5" />
                  Navigation
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-sidebar-accent/50" asChild>
                <Link to="/reporting">
                  <FileText className="mr-2 h-5 w-5" />
                  Reporting
                </Link>
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Administration
              </h3>
              <div className="mt-2 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-sidebar-accent/50" asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-fleetx-main/20 flex items-center justify-center text-white mr-2">
                AW
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@fleetx.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

            {/* Fleet Metrics */}
            <FleetMetrics metrics={fleetMetrics} />

            {/* FleetX Brain */}
            <div className="mt-6">
              <FleetBrain />
            </div>

            {/* Map and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <MapView />
              <AnalyticsChart data={analyticsData} />
            </div>

            {/* Vehicle List */}
            <div className="mt-6">
              <VehicleList vehicles={vehicles} />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Index;
