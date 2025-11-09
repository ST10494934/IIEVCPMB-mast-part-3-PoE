// src/context/MenuContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MenuItem } from '../types';

type MenuContextType = {
  menu: MenuItem[];
  addItem: (item: MenuItem) => void;
};

const MenuContext = createContext<MenuContextType>({ menu: [], addItem: () => {} });

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

  return (
    <MenuContext.Provider value={{ menu, addItem }}>
      {children}
    </MenuContext.Provider>
  );
};
