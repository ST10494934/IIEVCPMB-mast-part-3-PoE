//src/components/AppHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
}

export default function AppHeader({ title, showBack = false }: AppHeaderProps) {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity style={styles.backBtn} onPress={() => nav.navigate('Welcome')}>
          <Text style={styles.backTxt}>← Back to Home</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#D4A017',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    top: 30,
  },
  backTxt: {
    color: '#F5E6CC',
    fontWeight: '700',
    fontSize: 16,
  },
});
