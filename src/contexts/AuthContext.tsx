
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

// Define types for our authentication context
type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  registerWithEmailPassword: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Mock authentication for now - this will be replaced with actual Supabase auth
  useEffect(() => {
    // Check if there's a user in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('syncbridge_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock Google login - will be replaced with Supabase auth
  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock successful Google login 
      const mockUser = {
        id: 'google-' + Math.random().toString(36).substring(2),
        name: 'Google User',
        email: 'google.user@example.com',
        photoURL: 'https://via.placeholder.com/150',
      };
      
      setUser(mockUser);
      localStorage.setItem('syncbridge_user', JSON.stringify(mockUser));
      toast.success("Logged in successfully!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock email/password login - will be replaced with Supabase auth
  const loginWithEmailPassword = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock login logic
      const mockUser = {
        id: 'email-' + Math.random().toString(36).substring(2),
        name: email.split('@')[0],
        email,
      };
      
      setUser(mockUser);
      localStorage.setItem('syncbridge_user', JSON.stringify(mockUser));
      toast.success("Logged in successfully!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Email login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock registration - will be replaced with Supabase auth
  const registerWithEmailPassword = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock registration logic
      const mockUser = {
        id: 'email-' + Math.random().toString(36).substring(2),
        name,
        email,
      };
      
      setUser(mockUser);
      localStorage.setItem('syncbridge_user', JSON.stringify(mockUser));
      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout - will be replaced with Supabase auth
  const logout = async (): Promise<void> => {
    try {
      localStorage.removeItem('syncbridge_user');
      setUser(null);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  // Provide the auth context values
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithGoogle,
    loginWithEmailPassword,
    registerWithEmailPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
