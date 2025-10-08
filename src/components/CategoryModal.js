// src/components/CategoryModal.js
import React, { useState, useContext } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionsContext } from '../context/TransactionsContext';

export default function CategoryModal({ visible, type, onClose }) {
  const { categories, addCategory, deleteCategory } = useContext(TransactionsContext);
  const [newCategory, setNewCategory] = useState('');

  const categoryList = categories[type] || [];
  const isIncome = type === 'ingresos';

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la categoría');
      return;
    }

    if (categoryList.includes(newCategory.trim())) {
      Alert.alert('Error', 'Esta categoría ya existe');
      return;
    }

    await addCategory(type, newCategory.trim());
    setNewCategory('');
    Alert.alert('¡Éxito!', 'Categoría agregada correctamente');
  };

  const handleDeleteCategory = (categoryName) => {
    Alert.alert(
      'Eliminar Categoría',
      `¿Estás seguro de eliminar "${categoryName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteCategory(type, categoryName) }
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Categorías de {isIncome ? 'Ingresos' : 'Gastos'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View style={styles.addSection}>
            <TextInput style={styles.input} placeholder="Nueva categoría" value={newCategory} onChangeText={setNewCategory} />
            <TouchableOpacity style={[styles.addButton, { backgroundColor: isIncome ? '#10b981' : '#ef4444' }]} onPress={handleAddCategory}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Categorías Actuales</Text>
            
            {categoryList.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="folder-open-outline" size={48} color="#cbd5e1" />
                <Text style={styles.emptyText}>No hay categorías</Text>
              </View>
            ) : (
              <FlatList
                data={categoryList}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={styles.categoryItem}>
                    <View style={styles.categoryInfo}>
                      <Ionicons name={isIncome ? "arrow-down-circle" : "arrow-up-circle"} size={24} color={isIncome ? '#10b981' : '#ef4444'} />
                      <Text style={styles.categoryName}>{item}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteCategory(item)} style={styles.deleteButton}>
                      <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  addSection: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  input: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 12, padding: 16, fontSize: 16, color: '#1e293b' },
  addButton: { width: 56, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  listContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '600', color: '#475569', marginBottom: 12 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16, color: '#94a3b8', marginTop: 12 },
  categoryItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: 16, borderRadius: 12, marginBottom: 8 },
  categoryInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  categoryName: { fontSize: 16, fontWeight: '500', color: '#1e293b' },
  deleteButton: { padding: 8 },
  closeButton: { backgroundColor: '#f1f5f9', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  closeButtonText: { fontSize: 16, fontWeight: '600', color: '#64748b' },
});