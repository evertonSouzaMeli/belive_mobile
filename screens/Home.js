import * as React from 'react';
import { useState, useEffect } from 'react';
import {Button, Text, View, StyleSheet, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';


export default function Home({ navigation }) {
  const [nome, setNome] = useState("");

 /* useEffect(()=>{
    async function recoveryData() {
          let response = await AsyncStorage.getItem('userData');
          let json = JSON.parse(response);
          setNome(json.nome);
      }
      recoveryData();
    },[]); */

  return (
    <View style={styles.container}>
      <Text>Seja bem vindo {nome}</Text>
      <Button title="Perfil" onPress={ () => { navigation.navigate("Perfil") }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
