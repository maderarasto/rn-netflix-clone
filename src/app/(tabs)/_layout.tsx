import React from 'react';
import {Entypo, Feather, FontAwesome} from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@src/constants/Colors';
import { useColorScheme } from '@src/components/useColorScheme';
import { useClientOnlyValue } from '@src/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          marginHorizontal: 5,
          marginBottom: 5,
          borderRadius: 50,
          backgroundColor: 'black',
        }
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Feather name="search" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="AddMovie"
        options={{
          title: 'Add Movie',
          tabBarIcon: ({ color }) => <Feather name="plus" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
