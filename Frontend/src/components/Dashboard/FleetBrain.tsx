
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, AlertTriangle, Wrench } from 'lucide-react';

interface BrainAlert {
  id: string;
  type: 'fuel' | 'warning' | 'maintenance';
  icon: React.ReactNode;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

const FleetBrain: React.FC = () => {
  const alerts: BrainAlert[] = [
    {
      id: '1',
      type: 'fuel',
      icon: <Car className="h-4 w-4" />,
      message: 'Vehicle #12 reported 34% higher fuel consumption than fleet average. Recommend inspection.',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'warning',
      icon: <AlertTriangle className="h-4 w-4" />,
      message: 'Vehicle #19 triggered 2 engine warnings in 48 hours – possible early signs of failure.',
      severity: 'high'
    },
    {
      id: '3',
      type: 'maintenance',
      icon: <Wrench className="h-4 w-4" />,
      message: '3 vehicles are due for maintenance in less than 5 days – schedule now to avoid downtime.',
      severity: 'medium'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'fuel':
        return 'text-blue-600';
      case 'warning':
        return 'text-red-600';
      case 'maintenance':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="shadow-md border border-gray-100">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          FleetX Brain
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <Alert key={alert.id} className={`${getSeverityColor(alert.severity)} border-l-4`}>
            <div className={`${getIconColor(alert.type)}`}>
              {alert.icon}
            </div>
            <AlertDescription className="text-sm font-medium text-gray-700">
              {alert.message}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default FleetBrain;
