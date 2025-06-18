
import React from 'react';
import { FleetMetric } from '@/data/mockData';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface FleetMetricsProps {
  metrics: FleetMetric[];
}

const FleetMetrics: React.FC<FleetMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const MetricIcon = metric.icon;
        const isPositive = metric.change >= 0;
        
        return (
          <div key={metric.id} className="stat-card animate-fade-in">
            <div className="flex flex-col">
              <div className="stat-label">{metric.label}</div>
              <div className="stat-value">{metric.value}</div>
              <div className="flex items-center mt-1">
                <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <ArrowUpIcon className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className={`${metric.color} p-2 rounded-full stat-icon`}>
              <MetricIcon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FleetMetrics;
