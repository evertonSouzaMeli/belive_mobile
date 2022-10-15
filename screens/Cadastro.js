import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../style/MainStyle';

//PARAR AQUI

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [isSelected, setSelected] = useState(false)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorNome, setErrorNome] = useState(null)
  const [errorCpf, setErrorCpf] = useState(null)
  const [errorTelefone, setErrorTelefone] = useState(null)
  const [errorSenha, setErrorSenha] = useState(null)

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titulo, setTitulo] = useState(null)
  const [mensagem, setMensagem] = useState(null)
  const [tipo, setTipo] = useState(null)

  let cpfField = null;
  let telefoneField = null;

  const showDialog = (titulo, mensagem, tipo) => {
    setVisibleDialog(true);
    setTitulo(titulo);
    setMensagem(mensagem);
    setTipo(tipo);
  };

  const hideDialog = (status) => {
    setVisibleDialog(status)
  }

  const validar = () => {
    let error = false
    setErrorEmail(null)
    setErrorCpf(null)
    setErrorSenha(null)
    }
  
  /**
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())){
      setErrorEmail("Preencha seu e-mail corretamente")
      error = true
    }
    if (!cpfField.isValid()){
      setErrorCpf("Preencha seu CPF corretamente")
      error = true
    }
    if (telefone == null){
      setErrorTelefone("Preencha seu telefone corretamente")
      error = true
    }
    if (senha == null){
      setErrorSenha("Preencha a senha")
      error = true
    }
    return !error
  }
**/


   const cadastrar = () => {
      if (validar()){
        setLoading(true)
        
        let data = {
          email: email,
          cpf: cpf,
          nome: nome,
          telefone: telefone,
          senha: senha
        }
        
        usuarioService.cadastrar(data)
        .then((response) => {
          setLoading(false)
          const titulo = (response.data.status) ? "Sucesso" : "Erro"
          showDialog(titulo, response.data.mensagem, "SUCESSO")
          //Alert.alert(titulo, response.data.mensagem)          
        })
        .catch((error) => {
          setLoading(false)
          showDialog("Erro","Houve um erro inesperado", "ERRO")
          //Alert.alert("Erro", "Houve um erro inesperado")
        })
      }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={[styles.container, specificStyle.specificContainer]}
    keyboardVerticalOffset={80}>
    <ScrollView style={{ width: '100%' }}>
      <Text h3>Cadastre-se</Text>
      <Input
        placeholder="Nome"
        onChangeText={(value) => setNome(value)}
        errorMessage={errorNome}
      />

      <View style={styles.containerMask}>
        <TextInputMask
          placeholder="CPF"
          type={'cpf'}
          value={cpf}
          onChangeText={(value) => {
            setCpf(value);
            setErrorCpf(null);
          }}
          keyboardType="number-pad"
          returnKeyType="done"
          style={styles.maskedInput}
          ref={(ref) => (cpfField = ref)}
        />
      </View>

      <View style={styles.containerMask}>
        <TextInputMask
          placeholder="Telefone"
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          value={telefone}
          onChangeText={(value) => {
            setTelefone(value);
            setErrorTelefone(null);
          }}
          keyboardType="phone-pad"
          returnKeyType="done"
          style={styles.maskedInput}
          ref={(ref) => (telefoneField = ref)}
        />
      </View>

      <Input
        placeholder="E-mail"
        onChangeText={(value) => {
          setEmail(value);
          setErrorEmail(null);
        }}
        keyboardType="email-address"
        errorMessage={errorEmail}
      />

      <Input
        placeholder="Senha"
        onChangeText={(value) => setSenha(value)}
        errorMessage={errorSenha}
        secureTextEntry={true}
      />

      <Button
        title="Cadastrar"
        buttonStyle={styles.buttonCadastrar}
        /**
         onPress={() => cadastrar()}/>
       **/

        
       onPress={async () => {
          if (
            (nome != null) &
            (cpf != null) &
            (telefone != null) &
            (email != null) &
            (senha != null)
          ) {
            AsyncStorage.setItem(
              'userData',
              JSON.stringify({ nome, cpf, telefone, email, senha })
            );
            alert('Usuario Cadastrado com Sucesso');
            navigation.navigate('Login', { email, senha });
          } else {
            alert('Preencha todos os campos!');
          }
        }} 
      />
      
      <Button
        title="Voltar"
        buttonStyle={styles.buttonVoltar}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}


const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
    padding: 10
  },
  
})
