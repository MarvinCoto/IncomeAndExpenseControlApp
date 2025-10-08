// src/screens/IncomeHistoryScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionsContext } from '../hooks/useTransactions';

export default function IncomeHistoryScreen({ navigation }) {
  const { transactions } = useContext(TransactionsContext);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = más reciente primero

  const incomes = transactions
    .filter(t => t.type === 'ingreso')
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'long',
      year: 'numeric'
    });
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const groupByMonth = () => {
    const grouped = {};
    incomes.forEach(income => {
      const date = new Date(income.createdAt);
      const monthYear = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(income);
    });
    return grouped;
  };

  const groupedIncomes = groupByMonth();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Historial de Ingresos</Text>
          <Text style={styles.headerSubtitle}>{incomes.length} transacciones</Text>
        </View>
        <TouchableOpacity onPress={toggleSort} style={styles.sortButton}>
          <Ionicons 
            name={sortOrder === 'desc' ? 'arrow-down' : 'arrow-up'} 
            size={24} 
            color="#2563eb" 
          />
        </TouchableOpacity>
      </View>

      {/* Total Card */}
      <View style={styles.totalCard}>
        <Ionicons name="arrow-down-circle" size={40} color="#10b981" />
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Total Ingresos</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalIncome)}</Text>
        </View>
      </View>

      {/* Lista de Ingresos */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {incomes.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cash-outline" size={64} color="#cbd5e1" />
            <Text style={styles.emptyText}>No hay ingresos registrados</Text>
            <Text style={styles.emptySubtext}>
              Agrega tu primer ingreso desde la pestaña "Agregar"
            </Text>
          </View>
        ) : (
          Object.keys(groupedIncomes).map((monthYear) => (
            <View key={monthYear} style={styles.monthSection}>
              <Text style={styles.monthTitle}>{monthYear}</Text>
              {groupedIncomes[monthYear].map((income) => (
                <View key={income.id} style={styles.incomeItem}>
                  <View style={styles.incomeIcon}>
                    <Ionicons name="arrow-down" size={20} color="#10b981" />
                  </View>
                  
                  <View style={styles.incomeInfo}>
                    <Text style={styles.incomeCategory}>{income.category}</Text>
                    {income.description && (
                      <Text style={styles.incomeDescription}>{income.description}</Text>
                    )}
                    <Text style={styles.incomeDate}>{formatDate(income.createdAt)}</Text>
                  </View>

                  <Text style={styles.incomeAmount}>
                    +{formatCurrency(income.amount)}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  sortButton: {
    padding: 8,
  },
  totalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  totalInfo: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  monthSection: {
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  incomeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  incomeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  incomeCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  incomeDescription: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  incomeDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  incomeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
});