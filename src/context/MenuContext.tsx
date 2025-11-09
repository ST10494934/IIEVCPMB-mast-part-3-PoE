// src/context/MenuContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; 
import type { MenuItem } from '../types';

type MenuContextType = {
  menu: MenuItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void; 
};

// Updated default context value to include removeItem
const MenuContext = createContext<MenuContextType>({ menu: [], addItem: () => {}, removeItem: () => {} });

export const useMenu = () => useContext(MenuContext);
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Load menu from AsyncStorage on mount
    const loadMenu = async () => {
      const storedMenu = await AsyncStorage.getItem('@menu');
      if (storedMenu) setMenu(JSON.parse(storedMenu));
    };
    loadMenu();
  }, []);

  const addItem = async (item: MenuItem) => {
    const newMenu = [...menu, item];
    setMenu(newMenu);
    await AsyncStorage.setItem('@menu', JSON.stringify(newMenu));
  };
  
  // Remove an item by ID
  const removeItem = async (id: string) => {
    const newMenu = menu.filter(item => item.id !== id);
    setMenu(newMenu);
    // Update AsyncStorage with the new menu list
    await AsyncStorage.setItem('@menu', JSON.stringify(newMenu));
    Alert.alert('Success', 'Menu item removed!');
  };

  return (
    <MenuContext.Provider value={{ menu, addItem, removeItem }}> 
      {children}
    </MenuContext.Provider>
  );
};