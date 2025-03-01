import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { createHeader } from '@/AuthProvider/authProvider';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface AuthContextType {
  isAdmin: boolean;
  error: string | null;
  isloading: boolean;
  checkAdmin: () => Promise<void>;
  reset: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isloading, setIsLoading] = useState(false);
    const [user] = useAuthState(auth);
  
    const checkAdminStatus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!user) {
          setIsAdmin(false);
          return;
        }
        const header = await createHeader();
        const response = await axiosInstance.get("/admin/check", header);
        setIsAdmin(response.data.admin);
      } catch (error: any) {
        setError(error.message);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      if (user) {
        checkAdminStatus();
      } else {
        setIsAdmin(false);
        setIsLoading(false);
      }
    }, [user]);
  
    const reset = () => {
      setIsAdmin(false);
      setError(null);
      setIsLoading(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAdmin, error, isloading, checkAdmin: checkAdminStatus, reset }}>
        {children}
      </AuthContext.Provider>
    );
  };