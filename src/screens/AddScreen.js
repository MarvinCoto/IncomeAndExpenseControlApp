import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddScreen() {
  return (
    <View style={styles.container}>
      
        <Text style={styles.title}>Add screen</Text>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
  }
});