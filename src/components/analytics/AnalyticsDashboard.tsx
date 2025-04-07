
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

// Mock data for document processing time
const processingTimeData = [
  { name: "Jan", avgDays: 2.3 },
  { name: "Feb", avgDays: 3.1 },
  { name: "Mar", avgDays: 2.8 },
  { name: "Apr", avgDays: 2.1 },
  { name: "May", avgDays: 1.9 },
  { name: "Jun", avgDays: 2.4 }
];

// Mock data for document status distribution
const statusDistributionData = [
  { name: "Pending", value: 23 },
  { name: "In Review", value: 42 },
  { name: "Referred", value: 15 },
  { name: "Completed", value: 65 }
];

// Mock data for department performance
const departmentPerformanceData = [
  { name: "Legal", completed: 32, pending: 8 },
  { name: "Finance", completed: 45, pending: 12 },
  { name: "HR", completed: 28, pending: 5 },
  { name: "IT", completed: 18, pending: 10 },
  { name: "Exec", completed: 15, pending: 3 }
];

// Mock data for document volume
const documentVolumeData = [
  { name: "Week 1", documents: 24 },
  { name: "Week 2", documents: 18 },
  { name: "Week 3", documents: 32 },
  { name: "Week 4", documents: 28 },
  { name: "Week 5", documents: 35 },
  { name: "Week 6", documents: 27 }
];

// Colors for pie chart
const COLORS = ["#FFBB28", "#8884D8", "#0088FE", "#00C49F"];

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gov-primary">Workflow Analytics</h1>
        <p className="text-gray-500">Document processing metrics and insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Processing Time</CardTitle>
            <CardDescription>Time taken to complete document review (in days)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={processingTimeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} days`, "Avg. Time"]}
                    contentStyle={{ backgroundColor: "#f8f9fa", borderRadius: "0.5rem" }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="avgDays" 
                    stroke="#2C74B3" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Status Distribution</CardTitle>
            <CardDescription>Current status of all documents in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, "Documents"]}
                    contentStyle={{ backgroundColor: "#f8f9fa", borderRadius: "0.5rem" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Documents processed by each department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#f8f9fa", borderRadius: "0.5rem" }}
                  />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#00C49F" />
                  <Bar dataKey="pending" name="Pending" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Volume</CardTitle>
            <CardDescription>Number of documents processed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={documentVolumeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [value, "Documents"]}
                    contentStyle={{ backgroundColor: "#f8f9fa", borderRadius: "0.5rem" }}
                  />
                  <Legend />
                  <Bar dataKey="documents" fill="#205295" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for document processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Avg. Response Time</p>
              <p className="text-2xl font-bold text-gov-primary">1.8 days</p>
              <p className="text-xs text-green-600 mt-1">▼ 12% from last month</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Document Completion Rate</p>
              <p className="text-2xl font-bold text-gov-primary">87%</p>
              <p className="text-xs text-green-600 mt-1">▲ 5% from last month</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">Avg. Referrals per Document</p>
              <p className="text-2xl font-bold text-gov-primary">2.3</p>
              <p className="text-xs text-red-600 mt-1">▲ 8% from last month</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-500">User Engagement</p>
              <p className="text-2xl font-bold text-gov-primary">94%</p>
              <p className="text-xs text-green-600 mt-1">▲ 3% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
