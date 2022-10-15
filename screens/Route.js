import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Cadastro from './Cadastro';
import Principal from './Principal';
import Consulta from './Consulta';
import AgendamentoResultado from "./AgendamentoResultado";


const Stack = createStackNavigator();


export default function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      title: 'BeLive',
      headerTitleAlign: 'center',
      headerStyle: {
            backgroundColor: '#1E90FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro}/>
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Consulta" component	={Consulta}/>
        <Stack.Screen name="AgendamentoResultado" component={AgendamentoResultado}/>


    </Stack.Navigator>
  );
}
