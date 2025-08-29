import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  photo?: string; // base64 or uri
};

type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (user: User) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) setUser(JSON.parse(data));
    });
  }, []);

  const login = async (email: string, password: string) => {
    const data = await AsyncStorage.getItem('user');
    if (data) {
      const saved = JSON.parse(data);
      if (saved.email === email && saved.password === password) {
        setUser(saved);
        return true;
      }
    }
    return false;
  };

  const signup = async (newUser: User) => {
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(null); // force login after sign up
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    await AsyncStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
