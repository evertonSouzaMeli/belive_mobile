import * as React from 'react';
import { useState } from 'react';
import {Button, Text, View, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';

export default function Chatbot() {
    const [texto, setTexto] = useState("")
    const [resposta, setResposta] = useState("")


    const enviarTextoParaChatbot = () => {
        alert("Texto enviado para IBM Watson")
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View>
                <TextInput style={{ margin: 5, backgroundColor: 'white', borderColor: 'blue', borderWidth: 3 }} placeholderTextColor={"Entre com texto"} value={texto}  onChangeText={ value => { setTexto(value) }} />
                <Button title={"Enviar"} onPress={ () => { enviarTextoParaChatbot() }} />
            </View>
            <View>
                <TextInput style={{ margin: 5, backgroundColor: 'white', borderColor: 'green', borderWidth: 3 }}  placeholderTextColor={"Entre com texto"}  value={resposta}/>
            </View>
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
