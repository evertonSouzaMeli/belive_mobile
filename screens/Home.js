import React from 'react';
import {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import styles from '../style/MainStyle';
import ImageCarousel from '../components/carrosel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function Home() {
    const [user, setUser] = useState({
        name: ''
    });

    const api = axios.create({baseURL: 'http://localhost:8080',})
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

            <View style={{marginTop: 40, flex: 1}}>
                <Text style={estilo.texto}>Bem-vindo(a), {user.name}!</Text>
            </View>
            <View style={{flex: 2, marginBotton: 15}}>
                <ImageCarousel/>
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
