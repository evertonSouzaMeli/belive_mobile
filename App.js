import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';

import Chatbot from './screens/Chatbot';

const Stack = createStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Chatbot" component={Chatbot} />
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