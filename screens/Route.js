import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Cadastro from './Cadastro';
import Principal from './Principal';
import Agendamento from "./agendamento/Agendamento";
import AgendamentoConfirmacao from "./agendamento/AgendamentoConfirmacao";
import AgendamentoResultado  from "./agendamento/AgendamentoResultado";

/**
 * <Stack.Screen name={"Agendamento"} component={Agendamento}/>
 *             <Stack.Screen name={"AgendamentoResultado"} component={AgendamentoResultado}/>
 * **/

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

            <Stack.Screen name={"AgendamentoConfirmacao"} component={AgendamentoConfirmacao}/>
        </Stack.Navigator>
    );
}
