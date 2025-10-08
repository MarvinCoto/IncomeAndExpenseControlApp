// src/screens/AddScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TransactionModal from '../components/TransactionModal';

export default function AddScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState('');

  const openModal = (type) => {
    setTransactionType(type);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agregar Transacción</Text>
        <Text style={styles.headerSubtitle}>Elige el tipo de transacción</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => openModal('ingreso')}>
          <View style={styles.iconContainer}>
            <Ionicons name="arrow-down-circle" size={60} color="#10b981" />
          </View>
          <Text style={styles.cardTitle}>Agregar Ingreso</Text>
          <Text style={styles.cardSubtitle}>Registra tus entradas de dinero</Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Agregar</Text>
            <Ionicons name="add-circle" size={20} color="#10b981" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => openModal('gasto')}>
          <View style={styles.iconContainer}>
            <Ionicons name="arrow-up-circle" size={60} color="#ef4444" />
          </View>
          <Text style={styles.cardTitle}>Agregar Gasto</Text>
          <Text style={styles.cardSubtitle}>Registra tus salidas de dinero</Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Agregar</Text>
            <Ionicons name="add-circle" size={20} color="#ef4444" />
          </View>
        </TouchableOpacity>
      </View>

      <TransactionModal visible={modalVisible} type={transactionType} onClose={() => setModalVisible(false)} />
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