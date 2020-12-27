import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Timer from './Timer';
import Task from './Task'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      //for tab-bar customisation
      tabBarOptions = {{
        activeTintColor:'black', inactiveTintColor:'black', activeBackgroundColor: 'white', inactiveBackgroundColor: 'white'      }}>

        <Tab.Screen 
        name = "Timer" 
        component = {Timer} 
        options = {{
          tabBarIcon : ({color,size}) =>(
            <Ionicons name = 'list-circle' color = {'#f2a5a5'} size = {size}/>
          )}}
        />

        <Tab.Screen 
        name = "Task" 
        component = {Task} 
        options = {{
          tabBarIcon : ({color,size}) =>(
            <Ionicons name = 'list-circle' color = {'#f2a5a5'} size = {size}/>
          )}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}