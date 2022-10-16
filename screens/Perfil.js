import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImg from '../components/UserImg';
import styles from '../style/MainStyle';
import axios from "axios";


export default function Perfil({navigation}) {
    const [user, setUser] = useState({
        name: '',
        cpf: '',
        phone: '',
        userLogin: {
            username: '',
            password: ''
        }
    });
    const [visibleModal, setVisibleModal] = useState(null);

    useEffect(() => {
        refreshData();
    }, []);

    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})

    const pageEdit = () => {
        let { name, phone, userLogin } =  user

        navigation.navigate('EditarPerfil', { data: { name, phone, userLogin  } });
    };

    const deletar = async () => {
        try {
            let token = await AsyncStorage.getItem('token');

            let req = await api.delete('/user/customer/delete', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });

            console.log(req.data);
            await AsyncStorage.clear();
            alert('Usuário removido');
            navigation.reset({index: 0, routes: [{name: 'Login'}]});

        } catch (err) {
            alert(err.response.data.message);
        }
        //navigation.navigate("Login")
    };

    const refreshData = async () => {
        try {
            let token = await AsyncStorage.getItem('token');

            let req = await api.get('/user/customer/get', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });


            let resp = req.data

            setUser(resp);

        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#fff',
            }}>
            <View style={{flex:1, marginHorizontal:20}}>
                <View style={{ flex: 1, alignItems:'center', marginTop:30 }}>
                    <UserImg />
                </View>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom:15 }}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>Nome: </Text>
                    <Text style={{fontSize:14}}>{user.name}</Text>
                </View>

                <View
                    style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:15 }}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>CPF: </Text>
                    <Text style={{fontSize:14}}>{user.cpf}</Text>
                </View>

                <View
                    style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:15 }}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>Telefone: </Text>
                    <Text style={{fontSize:14}}>{user.phone}</Text>
                </View>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom:15 }}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>Email: </Text>
                    <Text style={{fontSize:14}}>{user.userLogin.username}</Text>
                </View>

                <View
                    style={{  flexDirection: 'row', justifyContent: 'space-between', marginBottom:15 }}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>Senha: </Text>
                    <Text style={{fontSize:14}}>********</Text>
                </View>
                <View style={{ flex: 1, marginTop:15 }}>
                    <Button
                        title="Editar"
                        onPress={() => {
                            pageEdit();
                        }}
                    />
                </View>

                <View style={{flex: 1}}>
                    <Button
                        title="Deletar usuário"
                        buttonStyle={styles.buttonApagar}
                        onPress={() => {
                            deletar();
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const specificStyle = StyleSheet.create({
    campo: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});
