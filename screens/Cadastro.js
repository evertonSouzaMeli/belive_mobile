import * as React from 'react';
import { useState } from 'react';
import {Button, Text, View, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';

export default function Cadastro({navigation}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.container}>
      <TextInput type="text" placeholder="Entre com nome" value={nome} onChangeText={ value => { setNome(value) }}/>
      <TextInput type="text" placeholder="Entre com email" value={email} onChangeText={ value => { setEmail(value) }}/>
      <TextInput type="password" placeholder="Entre com a senha" value={senha} onChangeText={ value => { setSenha(value) }}/>
      
      <Button title="Cadastrar" onPress={ async () => { 
          await AsyncStorage.setItem('userData',  JSON.stringify({ nome, email, senha }))
          alert( "Usuario Cadastrado com Sucesso")
          navigation.navigate("Login")} 
        }/>

      <Button title="Voltar" onPress={ () => { navigation.navigate("Login") } }/>
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
