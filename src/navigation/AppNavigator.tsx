import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PayslipDetailsScreen from '../screens/PayslipDetailsScreen';
import PayslipListScreen from '../screens/PayslipListScreen';

export type RootStackParamList = {
  Payslips: undefined;
  PayslipDetails: { payslipId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1976d2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackAccessibilityLabel: 'Go back',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Payslips"
          component={PayslipListScreen}
          options={{
            title: 'My Payslips',
          }}
        />
        <Stack.Screen
          name="PayslipDetails"
          component={PayslipDetailsScreen}
          options={{
            title: 'Payslip Details',
            headerBackAccessibilityLabel: 'Back to payslips list',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
