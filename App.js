import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';

import Login from './screens/Login';
import Home from './screens/Home';
import Cadastro from './screens/Cadastro';
import Perfil from './screens/Perfil';

const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Perfil" component={Perfil}/>
      </Stack.Navigator>
  );
}


export default function App(){
  return (
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
  )
}