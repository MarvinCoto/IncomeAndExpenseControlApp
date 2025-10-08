// src/context/TransactionsContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState({
    ingresos: ['Salario', 'Bonos', 'Freelance', 'Otros'],
    gastos: ['Alimentación', 'Transporte', 'Entretenimiento', 'Servicios', 'Salud', 'Otros']
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedTransactions, storedCategories] = await Promise.all([
        AsyncStorage.getItem('transactions'),
        AsyncStorage.getItem('categories')
      ]);

      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }

      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar transacción
  const addTransaction = async (transaction) => {
    const newTransaction = {
      id: Date.now().toString(),
      ...transaction,
      createdAt: new Date().toISOString()
    };

    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    await AsyncStorage.setItem('transactions', JSON.stringify(updated));
  };

  // Eliminar transacción
  const deleteTransaction = async (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    await AsyncStorage.setItem('transactions', JSON.stringify(updated));
  };

  // Agregar categoría
  const addCategory = async (type, categoryName) => {
    const updated = {
      ...categories,
      [type]: [...categories[type], categoryName]
    };
    setCategories(updated);
    await AsyncStorage.setItem('categories', JSON.stringify(updated));
  };

  // Eliminar categoría
  const deleteCategory = async (type, categoryName) => {
    const updated = {
      ...categories,
      [type]: categories[type].filter(c => c !== categoryName)
    };
    setCategories(updated);
    await AsyncStorage.setItem('categories', JSON.stringify(updated));
  };

  // Calcular totales
  const getTotals = () => {
    const ingresos = transactions
      .filter(t => t.type === 'ingreso')
      .reduce((sum, t) => sum + t.amount, 0);

    const gastos = transactions
      .filter(t => t.type === 'gasto')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ingresos,
      gastos,
      balance: ingresos - gastos
    };
  };

  // Obtener transacciones recientes
  const getRecentTransactions = (limit = 5) => {
    return [...transactions]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  };

  return (
    <TransactionsContext.Provider value={{
      transactions,
      categories,
      loading,
      addTransaction,
      deleteTransaction,
      addCategory,
      deleteCategory,
      getTotals,
      getRecentTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};