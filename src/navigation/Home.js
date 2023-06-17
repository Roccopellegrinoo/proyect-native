import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';

import Home from '../screens/Home'
import FuncionalitiesNav from './FuncionalitiesNav';
import MiPerfil from '../screens/MiPerfil'
import NewPosts from '../screens/NewPosts';

const Tab = createBottomTabNavigator()

export default function Ho24meNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='Feed' 
        // component={Feed}
        component={FuncionalitiesNav}
        options={{
            headerShown:false,
            tabBarIcon: () => 
            <AntDesign name='home' color='#74549B' size={24} />
        }}
        />
        <Tab.Screen
        name='NewPost'
        component={NewPosts}
        options={{
          headerShown:false,
          tabBarIcon: ()=> 
          <AntDesign name='plus' color='#74549B' size ={24} />
      }} 
        />
        <Tab.Screen 
            name='MiPerfil'
            component={MiPerfil}
            options={{
                headerShown:false,
                tabBarIcon: ()=> 
                <AntDesign name='profile' color='#74549B' size ={24} />
            }}    
        />
    </Tab.Navigator>
  )
}
