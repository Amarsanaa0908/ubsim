'use client';

// src/contexts/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Create the context with a default value
const AuthContext = createContext(undefined);

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';
const USERNAME_KEY = 'USERNAME';
const EMAIL_KEY = 'EMAIL';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and token from localStorage on initial render
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUsername = localStorage.getItem(USERNAME_KEY);
        const storedEmail = localStorage.getItem(EMAIL_KEY);

        setUser({
          id: '',
          name: storedUsername ?? 'Хэрэглэгч',
          email: storedEmail ?? 'amara.090801@gmail.com',
          points: 200,
          tier: 'Silver',
          avatar: '/',
          phone: 95141452,
        });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Login function - store user info and token in localStorage and state
  const login = (newToken, userData) => {
    try {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      setToken(newToken);
      setUser(userData);
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  // Logout function - remove user info and token from localStorage and state
  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  };

  // Update user function - update user info in localStorage and state
  const updateUser = (userData) => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...userData };
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user in localStorage:', error);
    }
  };

  // Calculate authentication status based on token existence
  const isAuthenticated = !!token;

  // Provide the auth context to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// Utility function to get user without using hooks (for non-React files)
export const getUserFromStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

// Utility function to get token without using hooks (for non-React files)
export const getTokenFromStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token from localStorage:', error);
    return null;
  }
};
