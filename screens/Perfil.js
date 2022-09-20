import * as React from 'react';
import { useState, useEffect } from 'react';
import {Button, TextInput, Text, View, StyleSheet, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';


export default function Perfil({ navigation }) {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: ""
  });

  useEffect(()=>{
      async function recoveryData() {
          let response = await AsyncStorage.getItem('userData');
          setUser(JSON.parse(response));
      }
      recoveryData();
    },[]);

  return (
    <View style={styles.container}>
      <Text>{user.nome}</Text>
      <Text>{user.email}</Text>
      <Text>{user.senha}</Text>

      <Button title="Sair do Aplicativo" onPress={ () => { navigation.navigate("Login") }} />
      <Button title="Voltar" onPress={ () => { navigation.navigate("Home") }} />
      
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
