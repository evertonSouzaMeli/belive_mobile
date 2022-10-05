import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from '../style/MainStyle';

export default function Chatbot() {
  return(
    <View style={[styles.container, specificStyle.specificContainer]}>
      <Text>Tela Chatbot</Text>
    </View>
  );
}


const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: '#fff',
  }
});