import { useState, useEffect } from 'react';

import * as React from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImg from '../components/UserImg';
import styles from '../style/MainStyle';

export default function Perfil({ navigation }) {
    const [user, setUser] = useState({
        nome: '',
        cpf: '',
        endereco: '',
        telefone: '',
        email: '',
        senha: '',
    });

    const voltar = () => {
        navigation.navigate('Home');
    };

    const deletar = () => {
        AsyncStorage.clear();
        alert('Usuário removido');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        //navigation.navigate("Login")
    };

    useEffect(() => {
        async function recoveryData() {
            let response = await AsyncStorage.getItem('userData');
            setUser(JSON.parse(response));
        }
        recoveryData();
    }, []);

    return (
        <View style={[styles.perfilContainer, specificStyle.cont1]}>
            <View style={[styles.pefilTopContainer, specificStyle.cont1]}>
                <UserImg />
            </View>

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Nome: </Text>
                <Text style={specificStyle.texto2}>{user.nome}</Text>
            </View>

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>CPF: </Text>
                <Text style={specificStyle.texto2}>{user.cpf}</Text>
            </View>

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Endereço: </Text>
                <Text style={specificStyle.texto2}>{user.endereco}</Text>
            </View>

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Telefone: </Text>
                <Text style={specificStyle.texto2}>{user.telefone}</Text>
            </View>

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Email: </Text>
                <Text style={specificStyle.texto2}>{user.email}</Text>
            </View>

            <View style={specificStyle.campo}>
                <Text style={specificStyle.texto}>Senha: </Text>
                <Text style={specificStyle.texto2}>{user.senha}</Text>
            </View>

            <View style={[styles.buttonContainer, specificStyle.cont1]}>
                <Button
                    title="Editar"
                    buttonStyle={styles.buttonEntrar}
                    onPress={() => {
                        voltar();
                    }}
                />
            </View>

            <View style={[styles.buttonContainer, specificStyle.cont1]}>
                <Button
                    title="Deletar usuário"
                    buttonStyle={styles.buttonApagar}
                    onPress={() => {
                        deletar();
                    }}
                />
            </View>
        </View>
    );
}

const specificStyle = StyleSheet.create({
    campo: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
        marginRight: 100,
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    texto2: {
        fontSize: 18,
        fontWeight: '',
        color: 'grey',
    },
    cont1: {
        flex: 1,
    },
});
