// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (username === 'chef' && password === '1234') {
      navigation.navigate('Chef');
    } else {
      Alert.alert('Access Denied', 'Invalid username or password.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1350&q=80' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Chef Login</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Welcome')}>
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
  input: { width: '100%', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 16, color: '#333', fontWeight: '600' },
  loginBtn: { width: '100%', backgroundColor: '#FFD700', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  loginText: { color: '#3C2F2F', fontWeight: '700', fontSize: 18 },
  backBtn: { marginTop: 10 },
  backText: { color: '#fff', textDecorationLine: 'underline', fontSize: 16 },
});
