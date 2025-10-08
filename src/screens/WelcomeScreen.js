// src/screens/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen({ onContinue }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="wallet" size={100} color="#2563eb" />
        
        <Text style={styles.title}>Control de Gastos</Text>
        <Text style={styles.subtitle}>
          Lleva un registro detallado de tus finanzas personales
        </Text>

        <View style={styles.features}>
          <FeatureItem icon="cash" text="Registra tus ingresos y gastos" />
          <FeatureItem icon="analytics" text="Visualiza tus estadísticas" />
          <FeatureItem icon="pricetags" text="Organiza por categorías" />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Comenzar</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <View style={styles.featureItem}>
      <Ionicons name={icon} size={24} color="#2563eb" />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  features: {
    marginTop: 40,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#475569',
    marginLeft: 15,
  },
  button: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});