import * as React from 'react';
import { useState, useEffect } from 'react';
import  { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/MainStyle';


export default function Cadastro({navigation}) {
  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [endereco, setEndereco] = useState(null);

  return (
    <View style={[styles.container, specificStyle.responsividade]}>

      <Text h3>Cadastre-se</Text>
      <Input
      placeholder="Nome"
      value={nome}
      onChangeText={ value => { setNome(value) }}/>

      <Input
      placeholder="CPF"
      value={cpf}
      onChangeText={ value => { setCpf(value)
      require }}/>

      <Input
      placeholder="Endereço"
      value={endereco}
      onChangeText={ value => { setEndereco(value)
      require }}/>

      <Input
      placeholder="Telefone"
      value={telefone}
      onChangeText={ value => { setTelefone(value)
      require }}/>

      <Input
      placeholder="E-mail"
      value={email}
      onChangeText={ value => { setEmail(value)
       }}/>

      <Input
      placeholder="Senha"
      value={senha}
      onChangeText={ value => { setSenha(value)
      require }}/>

      <Button
      title="Cadastrar"
      buttonStyle={styles.buttonCadastrar}
      onPress={ async () => {

        if (nome != null & cpf != null & telefone != null & endereco != null & email != null & senha != null) {
          AsyncStorage.setItem('userData',  JSON.stringify({ nome, cpf, telefone, endereco, email, senha }))
          alert( "Usuario Cadastrado com Sucesso")
          navigation.navigate("Login", { email, senha })
      }
      else {
        alert("Preencha todos os campos!")
      }

      }}/>

      <Button
      title="Voltar"
      buttonStyle={styles.buttonVoltar}
      onPress={ () => { navigation.navigate("Login") } }/>
    </View>
  );
}

const specificStyle = StyleSheet.create({
   responsividade:{
      display: 'flex'
    }

})
