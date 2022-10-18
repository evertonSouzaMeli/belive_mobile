import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImg from '../components/UserImg';
import styles from '../style/MainStyle';
import axios from "axios";
import {TextInputMask} from "react-native-masked-text";
import {ScrollView} from 'react-native-gesture-handler';


export default function EditarPerfil({navigation, route}) {
    const {data} = route.params;
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    let telefoneField = null;
    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})


    useEffect(() => {
        setName(data.name)
        setPhone(data.phone)
    }, [])

    const updateData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const req = await api.patch('/user/customer/update', {name, phone}, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            })
            navigation.reset({index: 0, routes: [{name: 'Principal'}]});

        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const voltar = () => {
        navigation.reset({index: 0, routes: [{name: 'Principal'}]});
    }

    return (
        <ScrollView 
            style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#fff',
            }}>
            <View style={{flex: 1, marginHorizontal: 20}}>
                <View style={{flex: 2, alignItems: 'center', marginTop: 5}}>
                    <UserImg/>
                </View>

                <View
                    style={specificStyle.specificContainer}>

                    <Text style={{ fontWeight: 'bold', fontSize: 16}}>Insira os dados abaixo: </Text>
                </View>

                <View
                    style={[styles.containerMask2, specificStyle.specificContainer]}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, paddingTop:5}}>Nome: </Text>
                    <TextInput value={name} onChangeText={value => {
                        setName(value)
                    }}/>
                </View>

                <View
                    style={[styles.containerMask2, specificStyle.specificContainer]}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, paddingTop:10 }}>Telefone: </Text>
                    <TextInputMask
                        value={phone}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) ',
                        }}
                        onChangeText={value => {
                            setPhone(value)
                        }}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        style={styles.maskedInput2}
                        ref={(ref) => (telefoneField = ref)}
                    />
                </View>


                <View style={{flex: 1, marginTop: 15}}>
                    <Button title={"Enviar"} onPress={() => {
                        updateData()
                    }}/>
                </View>
                <View style={{flex: 1, marginTop: 15}}>
                    <Button title={"Voltar"} onPress={() => {
                        voltar()
                    }}/>
                </View>

            </View>
        </ScrollView>

    )
}

const specificStyle = StyleSheet.create({
    specificContainer: {
        flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 15
    }
})
