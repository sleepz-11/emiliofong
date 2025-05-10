import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';
import { router } from 'expo-router';

// Mock user data
interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMounted = useRef(true);
  
  // Check if user is signed in
  const isSignedIn = user !== null;

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    if (!isMounted.current) return;
    setIsLoading(true);
    
    try {
      // Mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sign in
      if (email && password && isMounted.current) {
        setUser({
          id: '1',
          name: 'John Doe',
          email: email,
          profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
        });
        router.replace('/(tabs)');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    if (!isMounted.current) return;
    setIsLoading(true);
    
    try {
      // Mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sign up
      if (name && email && password && isMounted.current) {
        setUser({
          id: '1',
          name: name,
          email: email,
          profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
        });
        router.replace('/(tabs)');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  // Sign out function
  const signOut = () => {
    if (!isMounted.current) return;
    setUser(null);
    router.replace('/(auth)');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isSignedIn, 
        signIn, 
        signUp, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}