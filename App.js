import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import MyStack from './screens/Route';



export default function App(){
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
