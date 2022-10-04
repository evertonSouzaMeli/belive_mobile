import * as React from 'react';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

export default function Login({ navigation }) {
  const route = useRoute();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [userLogin, setuserLogin] = useState({
    email: '',
    senha: '',
  });

  const loadData = () => {
    const email = route.params.email;
    const senha = route.params.senha;
    const newUserLogin = { email, senha };
    setuserLogin({ ...newUserLogin });
    return newUserLogin;
  };

  const cadastrar = () => {
    navigation.navigate('Cadastro');
  };

  const entrar = () => {
    setEmail('');
    setSenha('');
    navigation.reset({ index: 0, routes: [{ name: 'Principal' }] });
  };

  return (
    <View style={styles.container}>

    <Image style={styles.imagem} source={require('../assets/BeLive.png')} />
      <Text style={{marginTop:50, marginBottom:20}} h3>Bem-vindo(a) ao BeLive!</Text>

      <Input
        type="text"
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />

      <Input
        type="password"
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        value={senha}
        onChangeText={(value) => {
          setSenha(value);
        }}
      />

      <Button
        icon={<Icon name="check" size={15} color="white" />}
        title=" Entrar"
        buttonStyle={styles.buttonEntrar}
        onPress={() => {
          entrar();
        }}
      />

      <Button
        icon={<Icon name="user" size={15} color="white" />}
        title=" Cadastrar"
        buttonStyle={styles.buttonCadastrar}
        onPress={() => {
          cadastrar();
        }}
      />
    </View>
  );
}
