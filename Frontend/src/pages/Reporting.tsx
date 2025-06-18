
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Shield, DollarSign, Activity, Wrench } from 'lucide-react';

const Reporting: React.FC = () => {
  const reportCategories = [
    {
      title: "Predictive Reports",
      description: "AI-powered analytics for future planning and optimization",
      icon: TrendingUp,
      color: "bg-blue-500",
      reports: ["Vehicle Breakdown Predictions", "Route Optimization Forecasts", "Fuel Consumption Trends"]
    },
    {
      title: "Compliance & Safety Reports",
      description: "Monitor regulatory compliance and safety metrics",
      icon: Shield,
      color: "bg-green-500",
      reports: ["Driver Safety Scores", "Vehicle Inspection Status", "Regulatory Compliance"]
    },
    {
      title: "Financial Reports",
      description: "Track costs, revenue, and financial performance",
      icon: DollarSign,
      color: "bg-yellow-500",
      reports: ["Cost per Mile Analysis", "Fuel Expense Reports", "Revenue by Route"]
    },
    {
      title: "Operational Reports",
      description: "Monitor daily operations and performance metrics",
      icon: Activity,
      color: "bg-purple-500",
      reports: ["Fleet Utilization", "Driver Performance", "Delivery Analytics"]
    },
    {
      title: "Maintenance Reports",
      description: "Track vehicle maintenance and service schedules",
      icon: Wrench,
      color: "bg-red-500",
      reports: ["Scheduled Maintenance", "Repair History", "Parts Inventory"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Intelligence Reporting</h1>
        <p className="text-gray-600">Comprehensive analytics and insights for your fleet operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {category.reports.map((report, reportIndex) => (
                    <div key={reportIndex} className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{report}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View Reports
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Quick Analytics Overview</span>
            </CardTitle>
            <CardDescription>Key performance indicators for your fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">98.5%</div>
                <div className="text-sm text-gray-600">Fleet Availability</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$2.45</div>
                <div className="text-sm text-gray-600">Cost per Mile</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-gray-600">On-Time Delivery</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">87</div>
                <div className="text-sm text-gray-600">Safety Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reporting;
