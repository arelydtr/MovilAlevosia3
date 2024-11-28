import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

// Pantallas para las pestañas
const Tab1 = () => (
  <View style={styles.screen}>
    <Text>Contenido de la pestaña 1</Text>
  </View>
);

const Tab2 = () => (
  <View style={styles.screen}>
    <Text>Contenido de la pestaña 2</Text>
  </View>
);

// Crear las pestañas
const Tab = createBottomTabNavigator();

export default function OtherScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Pestaña 1" component={Tab1} />
        <Tab.Screen name="Pestaña 2" component={Tab2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
