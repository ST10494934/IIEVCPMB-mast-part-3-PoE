import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, MenuItem } from '../types';
import { useMenu } from '../context/MenuContext';
import { v4 as uuidv4 } from 'uuid';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddDish'>;

interface MenuItemCardProps {
  item: MenuItem;
  onRemove: (id: string) => void;
}

const MenuItemCard = ({ item, onRemove }: MenuItemCardProps) => (
  <View style={styles.menuItemCard}>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>R{item.price}</Text>
    </View>
    <Text style={styles.itemDesc} numberOfLines={1}>{item.description}</Text>
    <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item.id)}>
      <Text style={styles.removeText}>Remove Dish</Text>
    </TouchableOpacity>
  </View>
);

export default function AddDishScreen() {
  const navigation = useNavigation<Nav>();
  const { menu, addItem, removeItem } = useMenu(); 

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [price, setPrice] = useState('');

  const onAddDish = () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const item: MenuItem = {
      id: uuidv4(),
      name,
      description,
      category,
      price,
    };

    addItem(item);
    Alert.alert('Success', 'Menu item added!');
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Starter');
  };
    
  // Define categories and grouping function for the removal section
  const menuCategories: ('Starter' | 'Main' | 'Dessert')[] = ['Starter', 'Main', 'Dessert'];
    
  const getItemsByCategory = (cat: 'Starter' | 'Main' | 'Dessert') =>
    menu.filter(item => item.category === cat);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      {/* Input Fields for Adding Dish */}
      <TextInput
        placeholder="Dish Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <View style={styles.categoryContainer}>
        {['Starter', 'Main', 'Dessert'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, category === cat ? styles.categorySelected : null]}
            onPress={() => setCategory(cat as 'Starter' | 'Main' | 'Dessert')}
          >
            <Text style={[styles.categoryText, category === cat ? styles.categoryTextSelected : null]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={onAddDish}>
        <Text style={styles.addText}>Add Dish</Text>
      </TouchableOpacity>
      
      {/*Section to display and remove items */}
      <View style={styles.currentMenuContainer}>
        <Text style={styles.currentMenuTitle}>Current Menu ({menu.length} items)</Text>
        {menu.length === 0 ? (
          <Text style={styles.emptyMenuText}>No items added yet.</Text>
        ) : (
          // Display items grouped by category 
          menuCategories.map(cat => {
            const items = getItemsByCategory(cat);
            
            if (items.length === 0) return null; // Don't show category if empty
            
            return (
              <View key={cat} style={styles.categoryGrouping}> 
                <Text style={styles.categoryRemoveTitle}>{cat}s ({items.length})</Text>
                {items.map(item => (
                  <MenuItemCard key={item.id} item={item} onRemove={removeItem} />
                ))}
              </View>
            );
          })
        )}
      </View>

      {/* Navigation Buttons */}
      <TouchableOpacity style={styles.viewMenuBtn} onPress={() => navigation.navigate('MenuDisplay')}>
        <Text style={styles.viewMenuText}>View Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Chef')}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 24,
  },

  title: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
    backgroundColor: '#1c1c1c',
  },
  categorySelected: {
    backgroundColor: '#FFD700',
  },
  categoryText: {
    color: '#FFD700',
    fontWeight: '700',
  },
  categoryTextSelected: {
    color: '#1c1c1c',
  },
  addBtn: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addText: {
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 18,
  },
  viewMenuBtn: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  viewMenuText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 16,
  },
  backBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  //New styles for displaying current menu items
  currentMenuContainer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginBottom: 20,
  },
  currentMenuTitle: {
    color: '#F5E6CC',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyMenuText: {
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  menuItemCard: {
    backgroundColor: '#252525',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '700',
    flexShrink: 1,
    marginRight: 10,
  },
  itemPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  itemDesc: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  removeBtn: {
    backgroundColor: '#C81D11', // Red for removal
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  removeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  categoryGrouping: {
    marginBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  categoryRemoveTitle: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
    paddingBottom: 5,
  },
});
