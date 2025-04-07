
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gov-primary">GovFlow</h2>
          <p className="mt-2 text-sm text-gray-600">
            Document Tracking & Workflow Management System
          </p>
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
