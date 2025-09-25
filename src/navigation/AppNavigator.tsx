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
      <Stack.Navigator>
        <Stack.Screen name="Payslips" component={PayslipListScreen} />
        <Stack.Screen
          name="PayslipDetails"
          component={PayslipDetailsScreen}
          options={{ title: 'Payslip Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
