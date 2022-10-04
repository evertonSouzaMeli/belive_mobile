import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from '../style/MainStyle';

export default function Home() {
  return(
    <View style={styles.homeContainer}>
      <View style={{
        flex:1,
        backgroundColor: '#00FF00',
       
        
      }}>
      <Text>Olá </Text>  
      </View>

      <View style={{
        flex:2,
        backgroundColor: '#ddFF00',
        
      }}>
      <Text>Nossos serviços</Text>
      </View>

    </View>
  );
}

