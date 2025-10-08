// src/navigation/AppNavigator.js
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNavigator';
import IncomeHistoryScreen from '../screens/IncomeHistoryScreen';
import ExpenseHistoryScreen from '../screens/ExpenseHistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showWelcome ? (
        <Stack.Screen name="Welcome">
          {props => (
            <WelcomeScreen 
              {...props} 
              onContinue={() => setShowWelcome(false)} 
            />
          )}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="IncomeHistory" component={IncomeHistoryScreen} />
          <Stack.Screen name="ExpenseHistory" component={ExpenseHistoryScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}