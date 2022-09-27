import * as React from 'react';
import { useState, useEffect } from 'react';
import  { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

//PARAR AQUI


export default function Cadastro({navigation}) {
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);


    return (
        <View style={[styles.container, specificStyle.specificContainer]}>

            <Text h3>Cadastre-se</Text>
            <Input
                placeholder="Nome"
                value={nome}
                onChangeText={ value => { setNome(value) }}/>



            <Input
                placeholder="E-mail"
                value={email}
                onChangeText={ value => { setEmail(value)
                }}/>




            <Input
                placeholder="Senha"
                value={senha}
                onChangeText={ value => { setSenha(value)
                    require }}/>




            <Button
                title="Cadastrar"
                buttonStyle={specificStyle.button}
                onPress={ async () => {

                    if (nome != null & email != null & senha != null) {
                        AsyncStorage.setItem('userData',  JSON.stringify({ nome, email, senha }))
                        alert( "Usuario Cadastrado com Sucesso")
                        navigation.navigate("Login", { email, senha })
                    }
                    else {
                        alert("Preencha todos os campos!")
                    }

                }}/>

            <Button
                title="Voltar"
                buttonStyle={specificStyle.button}
                onPress={ () => { navigation.navigate("Login") } }/>
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
    }
})
