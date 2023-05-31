import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';

import Home from '../screens/Home'
import Feed from '../screens/Feed';
import Profile from '../screens/Profile'
import NewPosts from '../screens/NewPosts';

const Tab = createBottomTabNavigator()

export default function Ho24meNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='Feed' 
        component={Feed}
        options={{
            headerShown:false,
            tabBarIcon: () => 
            <AntDesign name='home' color='green' size={24} />
        }}
        />
        <Tab.Screen
        name='NewPost'
        component={NewPosts}
        options={{
          tabBarIcon: ()=> 
          <AntDesign name='plus' color='red' size ={24} />
      }} 
        />
        <Tab.Screen 
            name='Profile'
            component={Profile}
            options={{
                tabBarIcon: ()=> 
                <AntDesign name='profile' color='red' size ={24} />
            }}    
        />
    </Tab.Navigator>
  )
}