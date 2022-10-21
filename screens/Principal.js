import * as React from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Perfil from './Perfil';
import Home from './Home';
import Chatbot from './Chatbot';
import Suporte from './Suporte';
import Agendamento from './Agendamento';

import ButtonMic from '../components/ButtonMic';

const Tab = createBottomTabNavigator();

export default function Principal({navigaton}) {

  return (
  <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: '#121212',
        tabBarActiveTintColor: '#1E90FF',
        headerShown: false,
      tabBarStyle: {
        paddingBottom: 5,
        paddingTop: 5
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Agendamento"
        component={Agendamento}
        options={{
          tabBarLabel: 'Agendamento',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ size, focused }) => (
            <ButtonMic size={size} focused={focused}/>
          ),
        }}
      />
      <Tab.Screen
        name="Suporte"
        component={Suporte}
        options={{
          tabBarLabel: 'Suporte',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="headset" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
