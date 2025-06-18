
import React from 'react';
import { AnalyticsData } from '@/data/mockData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsChartProps {
  data: AnalyticsData[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  return (
    <Card className="shadow-md border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle>Fleet Analytics</CardTitle>
        <CardDescription>Monthly fleet performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fuel" fill="#4CAF50" name="Fuel Consumption (gal)" />
              <Bar dataKey="distance" fill="#2E7D32" name="Distance (mi)" />
              <Bar dataKey="maintenance" fill="#8BC34A" name="Maintenance Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
