
import React, { createContext, useState, useContext, useEffect } from "react";

// Define user roles
export type UserRole = "admin" | "sender" | "reviewer" | "observer";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  position: string;
  avatar?: string;
}

// Define authentication context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "admin@gov.org",
    department: "Information Technology",
    role: "admin",
    position: "System Administrator"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@gov.org",
    department: "Finance",
    role: "sender",
    position: "Financial Analyst"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@gov.org",
    department: "Legal Affairs",
    role: "reviewer",
    position: "Legal Advisor"
  },
  {
    id: "4",
    name: "Anna Williams",
    email: "anna@gov.org",
    department: "Human Resources",
    role: "observer",
    position: "HR Manager"
  }
];

// Create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem("govflow-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(user => user.email === email);
        
        if (foundUser && password === "password") { // In a real app, use proper password comparison
          setUser(foundUser);
          localStorage.setItem("govflow-user", JSON.stringify(foundUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("govflow-user");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
