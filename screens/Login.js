import * as React from 'react';
import { useState, useEffect } from 'react';
import {Button, View, StyleSheet, TextInput, Text, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [user, setUser] = useState({
        email: "",
        senha: ""
    });

    async function recoveryData() {
        let response = await AsyncStorage.getItem('userData');
        setUser(JSON.parse(response));
    }

    useEffect(() => { recoveryData() }, [] );

    return(
    <View>
       <Text>Olá</Text>
        <TextInput placeholder={"Entre com o email"} onChangeText={ value => { setEmail(value) } }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
