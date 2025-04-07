
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Clock, 
  FileText, 
  FolderOpen, 
  Upload,
  CheckCircle,
  AlertCircle,
  Clock as ClockIcon,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock recent documents data
const recentDocuments = [
  {
    id: "doc-1",
    title: "Budget Proposal FY 2024",
    status: "in-review",
    updatedAt: "2 hours ago",
    assignedTo: "Finance Department"
  },
  {
    id: "doc-2",
    title: "Policy Amendment #127",
    status: "pending",
    updatedAt: "Yesterday",
    assignedTo: "Legal Affairs"
  },
  {
    id: "doc-3",
    title: "Interagency Cooperation Agreement",
    status: "completed",
    updatedAt: "3 days ago",
    assignedTo: "Executive Office"
  },
  {
    id: "doc-4",
    title: "Staff Training Program",
    status: "referred",
    updatedAt: "5 days ago",
    assignedTo: "Human Resources"
  }
];

// Get status icon based on document status
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "pending":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case "in-review":
      return <ClockIcon className="h-5 w-5 text-purple-500" />;
    case "referred":
      return <ArrowRight className="h-5 w-5 text-blue-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gov-primary">Welcome back, {user?.name}</h1>
        <p className="text-gray-500">Here's an overview of your document workflow</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Documents</p>
                <p className="text-3xl font-bold text-gov-primary">12</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Documents Completed</p>
                <p className="text-3xl font-bold text-gov-primary">87</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Processing Time</p>
                <p className="text-3xl font-bold text-gov-primary">2.4d</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Documents</p>
                <p className="text-3xl font-bold text-gov-primary">147</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your latest document activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <Link to={`/document/${doc.id}`} className="font-medium text-gov-primary hover:underline">
                        {doc.title}
                      </Link>
                      <p className="text-sm text-gray-500">Assigned to: {doc.assignedTo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`document-status status-${doc.status}`}>
                      {doc.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{doc.updatedAt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="link" asChild>
                <Link to="/documents" className="text-gov-accent">View all documents</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full flex justify-start gap-2 bg-gov-primary hover:bg-gov-light" asChild>
                <Link to="/upload">
                  <Upload className="h-4 w-4" />
                  <span>Upload New Document</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full flex justify-start gap-2" asChild>
                <Link to="/documents">
                  <FileText className="h-4 w-4" />
                  <span>Browse My Documents</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full flex justify-start gap-2" asChild>
                <Link to="/shared">
                  <FolderOpen className="h-4 w-4" />
                  <span>View Shared Documents</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full flex justify-start gap-2" asChild>
                <Link to="/activity">
                  <Clock className="h-4 w-4" />
                  <span>Recent Activity</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
