// src/screens/CategoriesScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryModal from '../components/CategoryModal';

export default function CategoriesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryType, setCategoryType] = useState('');

  const openModal = (type) => {
    setCategoryType(type);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categorías</Text>
        <Text style={styles.headerSubtitle}>Gestiona tus categorías</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => openModal('ingresos')}>
          <View style={styles.iconContainer}>
            <Ionicons name="pricetags" size={60} color="#10b981" />
          </View>
          <Text style={styles.cardTitle}>Categorías de Ingresos</Text>
          <Text style={styles.cardSubtitle}>Gestiona tus categorías de entradas</Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Ver Categorías</Text>
            <Ionicons name="chevron-forward" size={20} color="#10b981" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => openModal('gastos')}>
          <View style={styles.iconContainer}>
            <Ionicons name="albums" size={60} color="#ef4444" />
          </View>
          <Text style={styles.cardTitle}>Categorías de Gastos</Text>
          <Text style={styles.cardSubtitle}>Gestiona tus categorías de salidas</Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Ver Categorías</Text>
            <Ionicons name="chevron-forward" size={20} color="#ef4444" />
          </View>
        </TouchableOpacity>
      </View>

      <CategoryModal visible={modalVisible} type={categoryType} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1e293b' },
  headerSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  buttonsContainer: { flex: 1, padding: 20, gap: 16 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  iconContainer: { marginBottom: 16 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 },
  cardSubtitle: { fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 20 },
  cardButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#f1f5f9' },
  cardButtonText: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
});