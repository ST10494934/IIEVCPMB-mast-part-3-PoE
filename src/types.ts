// src/types.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'Starter' | 'Main' | 'Dessert';
  price: string;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Chef: undefined;
  AddDish: undefined;
  MenuDisplay: undefined;
};
