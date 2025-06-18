
import React from 'react';
import { Vehicle } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
      case 'issue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Issue</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-medium">Vehicle Fleet</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Fuel</TableHead>
              <TableHead>Speed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.name}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                <TableCell>{vehicle.driver}</TableCell>
                <TableCell>{vehicle.lastUpdate}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          vehicle.fuelLevel > 70 ? 'bg-green-500' : 
                          vehicle.fuelLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${vehicle.fuelLevel}%` }}
                      ></div>
                    </div>
                    <span>{vehicle.fuelLevel}%</span>
                  </div>
                </TableCell>
                <TableCell>{vehicle.speed} mph</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehicleList;
