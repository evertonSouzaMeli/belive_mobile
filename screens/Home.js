import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styles from '../style/MainStyle';
import ImageCarousel from '../components/carrosel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function Home({ navigation }) {
    const [user, setUser] = useState({
        name: ''
    });
    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})

    useEffect(() => {
        refreshData();
    }, []);


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
        <View style={styles.homeContainer}>
            <View style={{marginTop: 20, marginBottom: 20, flex: 2}}>
                <ImageCarousel/>
            </View>
            <View style={{flex: 1, marginBotton: 15, marginTop: 15}}>
                <Text style={estilo.texto}>Bem-vindo(a), {user.name}!</Text>
            </View>
        </View>
    );
}

const estilo = StyleSheet.create({
    texto: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
    },
});
