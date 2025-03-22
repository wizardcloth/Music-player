import React, { useEffect } from 'react';
import { useAuthStore } from "../stores/useAuthStore"; // Import Zustand store
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import LoadingSpinner from './spinner';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checkAdminStatus, isLoading, error, reset } = useAuthStore();
  const [user] = useAuthState(auth); 

  useEffect(() => {
    async function fetchAdminStatus() {
      if (user) {
        checkAdminStatus(user);  
      } else {
        reset();  
      }
    }
    fetchAdminStatus();
  }, [user, checkAdminStatus, reset]);

  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {children}
    </div>
  );
};

export default AuthProvider;
