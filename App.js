// App.js (en la raíz del proyecto)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransactionsProvider } from './src/hooks/useTransactions';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <TransactionsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TransactionsProvider>
  );
}