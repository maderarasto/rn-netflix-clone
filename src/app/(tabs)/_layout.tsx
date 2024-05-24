import React from 'react';
import {Entypo, Feather, FontAwesome} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { useColorScheme } from '@src/components/useColorScheme';


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
        listeners={{
          tabPress: (ev) => {
            ev.preventDefault();
          }
        }}
        options={{
          title: 'Add Movie',
          tabBarIcon: ({ color }) => <Feather name="plus" size={28} color={color} style={{ opacity: 0.3}} />,
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
        listeners={{
          tabPress: (ev) => {
            ev.preventDefault();
          }
        }}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={20} color={color} style={{ opacity: 0.3 }} />,
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
