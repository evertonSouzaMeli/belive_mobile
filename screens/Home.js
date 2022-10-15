import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import styles from '../style/MainStyle';
import ImageCarousel from '../components/carrosel';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
  const [user, setUser] = useState({
    nome: '',
  });

  useEffect(() => {
    async function recoveryData() {
      let response = await AsyncStorage.getItem('userData');
      setUser(JSON.parse(response));
    }
    recoveryData();
  }, []);

  return (
    <View style={styles.homeContainer}>
  
        <View style={{marginTop:40, flex:1}}>
        <Text style={estilo.texto}>Bem-vindo(a), {user.nome}!</Text>
        </View >
        <View style={{flex:2, marginBotton:15}}>
        <ImageCarousel />
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
