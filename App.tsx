/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { PayslipProvider } from './src/context/PayslipContext';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <PayslipProvider>
        <AppNavigator />
      </PayslipProvider>
    </GestureHandlerRootView>
  );
}
