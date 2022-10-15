import { useState, useEffect } from 'react';

import * as React  from 'react';
import { TextInput, Text, View, StyleSheet, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImg from '../components/UserImg';
import styles from '../style/MainStyle';
import axios from "axios";


export default function Perfil({ navigation }) {
  const [user, setUser] = useState({
    name: '',
    cpf: '',
    phone: '',
    userLogin: {
        username: '',
        password: '********'
    }
  });

    useEffect(() => {
        refreshData();
    }, []);

  const api = axios.create({baseURL: 'http://localhost:8080'})

  const voltar = () => {
    navigation.navigate('Home');
  };

  const deletar = async () => {

      try {
          let token = await AsyncStorage.getItem('token');

          let req = await api.get('/user/customer/delete', {
              headers: {
                  Authorization: token,
                  'Content-Type': 'application/json'
              }
          });

          console.log(req.data);
          AsyncStorage.clear();
          alert('Usuário removido');
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });

      }catch (err) {
          alert(err.response.data.message);
      }
    //navigation.navigate("Login")
  };

   const refreshData = async () => {
        try {
            let token = await AsyncStorage.getItem('token');

            let req = await api.get('/user/customer/get', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });


            let resp = req.data

            setUser(resp);

        } catch (err) {
            alert(err.response.data.message);
        }
    }


  return (
    <View style={[styles.perfilContainer, specificStyle.cont1]}>
      <View style={[styles.pefilTopContainer, specificStyle.cont1]}>
        <UserImg />
      </View>

      <View style={specificStyle.campo}>
        <Text style={specificStyle.texto}>Nome: </Text>
        <Text style={specificStyle.texto2}>{user.name}</Text>
      </View>

      <View style={specificStyle.campo}>
        <Text style={specificStyle.texto}>CPF: </Text>
        <Text style={specificStyle.texto2}>{user.cpf}</Text>
      </View>

      <View style={specificStyle.campo}>
        <Text style={specificStyle.texto}>Telefone:  </Text>
        <Text style={specificStyle.texto2}>{user.phone}</Text>
      </View>

      <View style={specificStyle.campo}>
        <Text style={specificStyle.texto}>Email: </Text>
        <Text style={specificStyle.texto2}>{user.userLogin.username}</Text>
      </View>

      <View style={specificStyle.campo}>
        <Text style={specificStyle.texto}>Senha: </Text>
        <Text style={specificStyle.texto2}>{user.userLogin.password}</Text>
      </View>

      <View style={[styles.buttonContainer, specificStyle.cont1]}>
        <Button
          title="Editar"
          buttonStyle={styles.buttonEntrar}
          onPress={() => {
            voltar();
          }}
        />
      </View>
      
      <View style={[styles.buttonContainer, specificStyle.cont1]}>
        <Button
          title="Deletar usuário"
          buttonStyle={styles.buttonApagar}
          onPress={() => {
            deletar();
          }}
        />
      </View>
    </View>
  );
}

const specificStyle = StyleSheet.create({
  campo: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
    marginRight: 100,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  texto2: {
    fontSize: 18,
    fontWeight: '',
    color: 'grey',
  },
  cont1: {
    flex: 1,
  },
});
