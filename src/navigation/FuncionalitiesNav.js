import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feed from '../screens/Feed'
import Comments from '../screens/Comments'
import ProfileAmigo from '../screens/ProfileAmigo'
import Buscador from '../screens/Buscador'
const Stack = createNativeStackNavigator()

function FunctionalitiesNav() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name='Feed'
            component={Feed}
            options={{
                headerShown: false,
                tabBarIcon: () => 
                <AntDesign name='home' color='green' size={24} />
            }}
        />
        <Stack.Screen
            name='Comments'
            component={Comments}
        />
        <Stack.Screen
            name='ProfileAmigo'
            component={ProfileAmigo}
        />
        {}
        <Stack.Screen
            name='Buscador'
            component={Buscador}
        />
        {}
      </Stack.Navigator>
    )
}

export default FunctionalitiesNav