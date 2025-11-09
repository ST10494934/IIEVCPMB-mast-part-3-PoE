// src/screens/MenuDisplayScreen.tsx
import React, { useState } from 'react'; // Imported useState
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MenuDisplay'>;

type CategoryFilter = 'All' | 'Starter' | 'Main' | 'Dessert';

export default function MenuDisplayScreen() {
  const { menu } = useMenu();
  const navigation = useNavigation<Nav>();

  // State to track the active filter, initialised to 'All'
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All'); 

  const categories: ('Starter' | 'Main' | 'Dessert')[] = ['Starter', 'Main', 'Dessert'];

  const getItemsByCategory = (cat: 'Starter' | 'Main' | 'Dessert') =>
    menu.filter(item => item.category === cat);
  
  // Filter the categories displayed based on the active filter state
  const filteredCategories = activeFilter === 'All'
    ? categories
    : categories.filter(cat => cat === activeFilter);
  
  // Logic to determine which items to display
  const getItemsToDisplay = (cat: CategoryFilter) => {
    return menu.filter(item => cat === 'All' || item.category === cat);
  };
  

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
      
      <Text style={styles.total}>Total Menu Items: {menu.length}</Text>
      
      {/* Filter Buttons Container */}
      <View style={styles.filterContainer}>
          {['All', ...categories].map((cat) => (
              <TouchableOpacity
                  key={cat}
                  style={[
                      styles.filterBtn,
                      activeFilter === cat ? styles.filterSelected : null,
                  ]}
                  onPress={() => setActiveFilter(cat as CategoryFilter)}
              >
                  <Text 
                      style={[
                          styles.filterText,
                          activeFilter === cat ? styles.filterTextSelected : null,
                      ]}
                  >
                      {cat}
                  </Text>
              </TouchableOpacity>
          ))}
      </View>

      {filteredCategories.map(cat => {
        const items = getItemsByCategory(cat);
        
        if (items.length === 0) return null;
        
        return (
          <View key={cat} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{cat}s</Text>
            {items.map(item => (
              <View key={item.id} style={styles.itemCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemPrice}>R{item.price}</Text>
              </View>
            ))}
          </View>
        );
      })}
      
      {/* Display a message if no items match the filter */}
      {filteredCategories.length === 0 && activeFilter !== 'All' && (
        <Text style={styles.emptyFilterText}>No {activeFilter}s on the menu yet.</Text>
      )}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 16 },
  backBtn: { marginBottom: 16 },
  backText: { color: '#FFD700', textDecorationLine: 'underline', fontSize: 16 },
  total: { color: '#FFD700', fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  categorySection: { marginBottom: 24 },
  categoryTitle: { color: '#FFD700', fontSize: 24, fontWeight: '700', marginBottom: 12 },
  itemCard: { backgroundColor: '#333', padding: 16, borderRadius: 12, marginBottom: 12 },
  itemName: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  itemDesc: { color: '#ccc', fontSize: 16, marginBottom: 4 },
  itemPrice: { color: '#FFD700', fontSize: 18, fontWeight: '700' },
  
  // Styles for the Filter functionality
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4A017',
  },
  filterSelected: {
    backgroundColor: '#D4A017',
    borderColor: '#D4A017',
  },
  filterText: {
    color: '#D4A017',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextSelected: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
  emptyFilterText: { // For when a filter is active but there are no items
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
});
