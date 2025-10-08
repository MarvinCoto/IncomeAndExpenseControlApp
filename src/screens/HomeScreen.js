// src/screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionsContext } from '../hooks/useTransactions';

export default function HomeScreen() {
  const { getTotals, getRecentTransactions, transactions } = useContext(TransactionsContext);
  const { ingresos, gastos, balance } = getTotals();
  const recentTransactions = getRecentTransactions();

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  const showIncomesHistory = () => {
    const incomesList = transactions.filter(t => t.type === 'ingreso');
    if (incomesList.length === 0) {
      Alert.alert('Historial de Ingresos', 'No hay ingresos registrados aún');
    } else {
      const message = incomesList.map(t => 
        `${t.category}: ${formatCurrency(t.amount)} - ${formatDate(t.createdAt)}`
      ).join('\n');
      Alert.alert('Historial de Ingresos', message);
    }
  };

  const showExpensesHistory = () => {
    const expensesList = transactions.filter(t => t.type === 'gasto');
    if (expensesList.length === 0) {
      Alert.alert('Historial de Gastos', 'No hay gastos registrados aún');
    } else {
      const message = expensesList.map(t => 
        `${t.category}: ${formatCurrency(t.amount)} - ${formatDate(t.createdAt)}`
      ).join('\n');
      Alert.alert('Historial de Gastos', message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Resumen de tus finanzas</Text>
      </View>

      {/* Balance Principal */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Balance Total</Text>
        <Text style={[styles.balanceAmount, { color: balance >= 0 ? '#10b981' : '#ef4444' }]}>
          {formatCurrency(balance)}
        </Text>
      </View>

      {/* Tarjetas de Ingresos y Gastos */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="arrow-down-circle" size={32} color="#10b981" />
          <Text style={styles.statLabel}>Ingresos</Text>
          <Text style={styles.statAmount}>{formatCurrency(ingresos)}</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="arrow-up-circle" size={32} color="#ef4444" />
          <Text style={styles.statLabel}>Gastos</Text>
          <Text style={styles.statAmount}>{formatCurrency(gastos)}</Text>
        </View>
      </View>

      {/* Botones de Historial */}
      <View style={styles.historyButtons}>
        <TouchableOpacity style={styles.historyButtonIncome} onPress={showIncomesHistory}>
          <View>
            <Text style={styles.historyButtonLabel}>Historial</Text>
            <Text style={styles.historyButtonTitle}>Ingresos</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.historyButtonExpense} onPress={showExpensesHistory}>
          <View>
            <Text style={styles.historyButtonLabel}>Historial</Text>
            <Text style={styles.historyButtonTitle}>Gastos</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Transacciones Recientes */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
        
        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>No hay transacciones aún</Text>
            <Text style={styles.emptySubtext}>
              Agrega tu primera transacción desde la pestaña "Agregar"
            </Text>
          </View>
        ) : (
          recentTransactions.map(transaction => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={[
                styles.transactionIcon,
                { backgroundColor: transaction.type === 'ingreso' ? '#d1fae5' : '#fee2e2' }
              ]}>
                <Ionicons
                  name={transaction.type === 'ingreso' ? 'arrow-down' : 'arrow-up'}
                  size={20}
                  color={transaction.type === 'ingreso' ? '#10b981' : '#ef4444'}
                />
              </View>

              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>
                  {transaction.description || transaction.category}
                </Text>
                <Text style={styles.transactionCategory}>
                  {transaction.category} • {formatDate(transaction.createdAt)}
                </Text>
              </View>

              <Text style={[
                styles.transactionAmount,
                { color: transaction.type === 'ingreso' ? '#10b981' : '#ef4444' }
              ]}>
                {transaction.type === 'ingreso' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1e293b' },
  headerSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  balanceCard: { backgroundColor: '#2563eb', margin: 20, marginTop: 10, padding: 24, borderRadius: 16, alignItems: 'center' },
  balanceLabel: { color: '#bfdbfe', fontSize: 14, marginBottom: 8 },
  balanceAmount: { fontSize: 36, fontWeight: 'bold', color: 'white' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 12 },
  statCard: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 8 },
  statAmount: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginTop: 4 },
  historyButtons: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginTop: 16, marginBottom: 8 },
  historyButtonIncome: { 
    flex: 1, 
    backgroundColor: '#10b981',
    padding: 16, 
    borderRadius: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  historyButtonExpense: { 
    flex: 1, 
    backgroundColor: '#ef4444',
    padding: 16, 
    borderRadius: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  historyButtonLabel: { fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  historyButtonTitle: { fontSize: 16, fontWeight: '600', color: 'white', marginTop: 4 },
  recentSection: { padding: 20, paddingTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b', marginBottom: 16 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16, fontWeight: '500', color: '#64748b', marginTop: 12 },
  emptySubtext: { fontSize: 14, color: '#94a3b8', marginTop: 4, textAlign: 'center', paddingHorizontal: 40 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 8 },
  transactionIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  transactionInfo: { flex: 1, marginLeft: 12 },
  transactionDescription: { fontSize: 15, fontWeight: '500', color: '#1e293b' },
  transactionCategory: { fontSize: 13, color: '#64748b', marginTop: 2 },
  transactionAmount: { fontSize: 16, fontWeight: '600' },
});