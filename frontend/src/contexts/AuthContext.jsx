import React, { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from storage if not expired
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const expiry = localStorage.getItem('sessionExpiry');

    if (storedUser && expiry && Date.now() < parseInt(expiry, 10)) {
      setUser(JSON.parse(storedUser));
    } else {
      logout(); // expired session
    }
  }, []);

  // Auto-logout on expiry check every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = localStorage.getItem('sessionExpiry');
      if (expiry && Date.now() > parseInt(expiry, 10)) {
        logout();
      }
    }, 60000); // check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const login = (userData) => {
    const expiryTime = Date.now() + 3600 * 1000; // 1 hour from now
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('sessionExpiry', expiryTime.toString());
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
