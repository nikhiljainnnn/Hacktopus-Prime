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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - you can customize this
      const mockUser = {
        id: '1',
        username: 'user',
        firstName: 'User',
        lastName: 'Name',
        email: 'user@example.com',
        phone: '+1234567890',
        dateOfBirth: '1990-01-01',
        gender: 'prefer-not-to-say',
        location: 'User City',
        occupation: 'Student',
        notifications: {
          email: true,
          sms: true,
          push: true,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showPhone: false,
          showLocation: false
        }
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user from signup data
      const mockUser = {
        id: '2',
        username: userData.username || 'user',
        firstName: userData.firstName || 'User',
        lastName: userData.lastName || 'Name',
        email: userData.email,
        phone: userData.phone || '+1234567890',
        dateOfBirth: userData.dateOfBirth || '1990-01-01',
        gender: userData.gender || 'prefer-not-to-say',
        location: userData.location || 'User City',
        occupation: userData.occupation || 'Student',
        notifications: {
          email: true,
          sms: true,
          push: true,
          security: true
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showPhone: false,
          showLocation: false
        }
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

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

  const updateUser = async (updateData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create updated user object
      const updatedUser = { ...user, ...updateData };
      
      // Update state and localStorage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
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
