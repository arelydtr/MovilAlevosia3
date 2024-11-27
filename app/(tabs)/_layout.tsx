import React from 'react';
// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import  {TabBarIcon}  from '@/components/navigation/TabBarIcon';







export default function TabLayout() {
  const colorScheme = useColorScheme();

  

  // ejemplo de colocar un texto sombreado

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>

      {/* Pantalla inicial: Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />


      {/* Pantalla de Quiénes Somos */}
      <Tabs.Screen
        name="QuienesSomos"
        options={{
          title: 'Quiénes Somos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />

      {/* Pantalla de Login */}
      <Tabs.Screen
        name="Login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'log-in' : 'log-in-outline'} color={color} />
          ),
        }}
      />



    </Tabs>
  );
}
