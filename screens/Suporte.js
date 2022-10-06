import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import styles from '../style/MainStyle';

export default function Suporte() {
  return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image style={styles.imagem} source={require('../assets/BeLive.png')} />
          <Text style={specificStyle.textoTitulo}>
            {' '}
            Agradecemos pela preferência em utilizar noss platafomra! Procuramos o
            melhor para nossos clientes, focando no desenvolvimento de uma
            experiência que seja simples, fácil e rápida.
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={specificStyle.texto}>Colaboradores: </Text>
          <Text>Arthur Silva Borges</Text>
          <Text>Everton de Souza Silva</Text>
          <Text>Gustavo Mangini Guedes Rufino</Text>
          <Text>Leonardo Cezar de Oliveira</Text>
          <Text>Samuel Novais Cavelho</Text>
        </View>
      </View>
  );
}


const specificStyle = StyleSheet.create({
  texto: {
    fontWeight: 'bold',
  },
  textoTitulo: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
