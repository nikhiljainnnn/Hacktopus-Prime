import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to load auth data:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (identifier, password) => {
    try {
      // Simulate successful login (replace with real API in production)
      const mockUser = {
        username: identifier,
        firstName: 'User',
        lastName: 'Demo',
        email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      // Store data locally
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Update state
      setToken(mockToken);
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate successful signup (replace with real API in production)
      const mockUser = {
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      // Store data locally
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Update state
      setToken(mockToken);
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      throw new Error('Signup failed: ' + error.message);
    }
  };

  const logout = () => {
    // Clear all data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
