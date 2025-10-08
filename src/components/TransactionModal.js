// src/components/TransactionModal.js
import React, { useState, useContext } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionsContext } from '../hooks/useTransactions';
import { Picker } from '@react-native-picker/picker';

export default function TransactionModal({ visible, type, onClose }) {
  const { addTransaction, categories } = useContext(TransactionsContext);
  
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categoryList = type === 'ingreso' ? categories.ingresos : categories.gastos;

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSave = async () => {
    if (!amount || !category) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido');
      return;
    }

    await addTransaction({
      type,
      amount: numAmount,
      category,
      description,
      date
    });

    Alert.alert('¡Éxito!', `${type === 'ingreso' ? 'Ingreso' : 'Gasto'} agregado correctamente`);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {type === 'ingreso' ? 'Nuevo Ingreso' : 'Nuevo Gasto'}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={28} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Monto *</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput style={styles.input} placeholder="0.00" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Categoría *</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                  <Picker.Item label="Selecciona una categoría" value="" />
                  {categoryList.map(cat => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput style={[styles.input, styles.textArea]} placeholder="Opcional: detalles de la transacción" value={description} onChangeText={setDescription} multiline numberOfLines={3} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha</Text>
              <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleClose}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.saveButton, { backgroundColor: type === 'ingreso' ? '#10b981' : '#ef4444' }]} onPress={handleSave}>
                <Ionicons name="checkmark" size={20} color="white" />
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 12, paddingHorizontal: 16 },
  currencySymbol: { fontSize: 18, fontWeight: '600', color: '#64748b', marginRight: 8 },
  input: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 12, padding: 16, fontSize: 16, color: '#1e293b' },
  textArea: { height: 80, textAlignVertical: 'top' },
  pickerContainer: { backgroundColor: '#f1f5f9', borderRadius: 12, overflow: 'hidden' },
  picker: { height: 50 },
  buttonContainer: { flexDirection: 'row', gap: 12, marginTop: 24, marginBottom: 20 },
  button: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, gap: 8 },
  cancelButton: { backgroundColor: '#f1f5f9' },
  cancelButtonText: { color: '#64748b', fontSize: 16, fontWeight: '600' },
  saveButton: { backgroundColor: '#2563eb' },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});