import React from 'react';
import {Entypo, Feather, FontAwesome, Ionicons} from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

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
        // headerShown: false,
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <Ionicons name="menu" size={28} color="white" style={{alignSelf: 'center' }} />
          </View>
        ),
        headerTitle: () => (
          <Image source={require('../../../assets/images/netflix_logo.png')} style={styles.headerLeftImage} />
        ),
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        tabBarStyle: styles.tabBarStyle
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
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

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'black',
  },

  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  headerLeftImage: { 
    width: 70, 
    height: 30, 
    marginBottom: 10 
  },

  tabBarStyle: {
    height: 60,
    // margin: 10,
    // borderRadius: 50,
    backgroundColor: 'black',
  }
})
