// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const nav = useNavigation<Nav>();

  return (
    <ImageBackground
    // Sets the background image for the screen
      source={{ uri: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1350&q=80' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
        // App Logo Display
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Christoffel Table</Text>
        <Text style={styles.subtitle}>An exclusive dining experience</Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => nav.navigate('Login')}>
          {/* Button to navigate to the Chef login screen */}
          <Text style={styles.primaryText}>Login as Chef</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => nav.navigate('MenuDisplay')}>
          {/* Button to navigate directly to the guest menu view */}
          <Text style={styles.secondaryText}>Continue as Guest</Text>
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
  logo: { width: 140, height: 140, borderRadius: 70, marginBottom: 20 },
  title: { color: '#FFD700', fontSize: 36, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  subtitle: { color: '#fff', fontSize: 18, textAlign: 'center', marginBottom: 30 },
  primaryBtn: { backgroundColor: '#FFD700', paddingVertical: 14, paddingHorizontal: 36, borderRadius: 30, marginBottom: 16 },
  primaryText: { color: '#3C2F2F', fontWeight: '700', fontSize: 18 },
  secondaryBtn: { borderWidth: 2, borderColor: '#FFD700', paddingVertical: 12, paddingHorizontal: 36, borderRadius: 30 },
  secondaryText: { color: '#FFD700', fontWeight: '700', fontSize: 18 },
});
