
import { useState, useEffect } from 'react';


import * as React from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../style/MainStyle';




export default function Perfil({ navigation }) {
    const [user, setUser] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const voltar = () =>{
        navigation.navigate("Home")
    }

    const deletar = () => {
        AsyncStorage.clear();
        alert("Usuário removido")
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        //navigation.navigate("Login")
    }


    useEffect(()=>{
        async function recoveryData() {
            let response = await AsyncStorage.getItem('userData');
            setUser(JSON.parse(response));
        }
        recoveryData();
    },[]);

    return (
        <View style={specificStyle.specificContainer} >

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Nome: </Text>
                <Text
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}style={specificStyle.texto2}>{user.nome}</Text>
            </View>


            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Email: </Text>
                <Text style={specificStyle.texto2}>{user.email}</Text>
            </View>

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Senha: </Text>
                <Text style={specificStyle.texto2}>{user.senha}</Text>
            </View>

            <Button
                title="Voltar"
                buttonStyle={specificStyle.button}
                onPress={
                    () => { voltar()
                    }}
            />

            <Button
                title="Deletar usuário"
                buttonStyle={specificStyle.button}
                onPress={
                    () => { deletar()
                    }}
            />


        </View>
    );
}

const specificStyle = StyleSheet.create({
    specificContainer: {
        backgroundColor: "#fff"
    },
    button: {
        width: "100%",
        marginTop: 10
    },
    campo: {
        flex: 1,
        justifyContent:'space-between',
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:5
    },
    texto:{
        fontWeight:"bold",
        fontSize: 18
    },
    texto2:{
        fontSize:14,
        fontWeight:'bold',
        color:'grey',
    }
})
