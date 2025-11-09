// src/screens/ChefScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Chef'>;

export default function ChefScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1350&q=80' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome, Chef!</Text>

        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.navigate('AddDish')}
        >
          {/* Button to navigate to the screen for adding a new menu item */}
          <Text style={styles.menuText}>Add Menu Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.navigate('MenuDisplay')}
        >
          {/* Button to navigate to view the full menu */}
          <Text style={styles.menuText}>View Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Welcome')}>
          {/* Button to log out / return to the Welcome screen */}
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: { color: '#FFD700', fontSize: 36, fontWeight: '700', marginBottom: 40, textAlign: 'center' },
  menuBtn: { width: '100%', backgroundColor: '#FFD700', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  menuText: { color: '#3C2F2F', fontWeight: '700', fontSize: 18 },
  backBtn: { marginTop: 10 },
  backText: { color: '#fff', textDecorationLine: 'underline', fontSize: 16 },
});
