import * as React from 'react';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const route = useRoute();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [userLogin, setuserLogin] = useState({
    email: '',
    senha: '',
  });

  const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})

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

  const entrar = async () => {
    try{

      let obj = { username: email, password: senha}

      let req = await api.post('/user/customer/login', obj,{
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await AsyncStorage.setItem('token', req.data.token)

      navigation.reset({ index: 0, routes: [{ name: 'Principal' }] });

    }catch (err){
      alert(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>

    <Image style={styles.imagemLogin} source={require('../assets/BeLive.png')} />
      <Text style={{marginTop:50, marginBottom:20}} h3>Bem-vindo(a) ao BeLive!</Text>

      <Input
        type="text"
        placeholder="E-mail"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
        keyboardType="email-address"
      />

      <Input
        type="password"
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        value={senha}
        onChangeText={value => {
          setSenha(value);
        }}
        secureTextEntry={true}
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
