
import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/components/dashboard/Dashboard";
import DocumentUploader from "@/components/documents/DocumentUploader";

const Index: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Render different content based on the path
  const renderContent = () => {
    if (path === "/" || path === "/dashboard") {
      return <Dashboard />;
    } else if (path === "/upload") {
      return <DocumentUploader />;
    } else {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gov-primary mb-4">Coming Soon</h1>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default Index;
