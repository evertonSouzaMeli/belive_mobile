import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Login';
import Cadastro from './Cadastro';
import Principal from './Principal';
import AgendamentoResultado from "./AgendamentoResultado";
import AgendamentoMedico from "./AgendamentoMedico";
import EditarPerfil from "./EditarPerfil";
import Perfil from "./Perfil";
import Consulta from './Consulta';



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
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Cadastro" component={Cadastro}/>
            <Stack.Screen name="Principal" component={Principal}/>
            <Stack.Screen name="AgendamentoResultado" component={AgendamentoResultado}/>
            <Stack.Screen name="AgendamentoMedico" component={AgendamentoMedico}/>
            <Stack.Screen name="EditarPerfil" component={EditarPerfil}/>
            <Stack.Screen name="Perfil" component={Perfil}/>
            <Stack.Screen name="Consulta" component={Consulta}/>
        </Stack.Navigator>
    );
}
