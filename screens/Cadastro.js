import * as React from 'react';
import { useState, useEffect } from 'react';
import  { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

//PARAR AQUI


export default function Cadastro({navigation}) {

    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [endereco, setEndereco] = useState(null);

    //TESTE
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorNome, setErrorNome] = useState(null)
    const [errorCpf, setErrorCpf] = useState(null)
    const [errorTelefone, setErrorTelefone] = useState(null)
    const [errorSenha, setErrorSenha] = useState(null)
    //TESTE



// TESTE  DAQUI PRA BAIXO ->>
    const validar = () => {
        let error = false
        setErrorEmail(null)
        setErrorCpf(null)
        setErrorSenha(null)

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
// TESTE DAQUI PRA CIMA



    return (

        //<ScrollView style={{width: "100%"}}>
        <ScrollView style={styles.visao}>
            <View style={[styles.container, styles.visao]}>
                <Text h3>Cadastre-se</Text>
                <Input
                    placeholder="Nome"
                    value={nome}
                    onChangeText={ value => { setNome(value) }}
                    errorMessage={errorEmail} />

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
        </ScrollView>
    );
}


