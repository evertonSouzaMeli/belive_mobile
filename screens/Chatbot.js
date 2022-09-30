import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import base64 from 'react-native-base64';
import SpeechToText from '../components/SpeechToText';
import axios from 'axios';
import * as Speech from "expo-speech";

export default function Chatbot() {
    const [texto, setTexto] = useState("")
    const [resposta, setResposta] = useState("")

    const key = "PJzIsPSS51vZx8VoQLdwyuXXvOZZd52uOUBp1KWmyZTu"
    const encodedKey = base64.encode(`apikey:${key}`)

    const enviarTextoParaChatbot = () => {
        axios.post(
            `https://api.us-south.assistant.watson.cloud.ibm.com/instances/11a13d07-78ef-4242-89cc-782d5bd13ceb/v1/workspaces/2f75e230-f055-4276-a75b-b2c2ae8ba53a/message?version=2018-09-20`,
            {input: {text: texto}},
            {
                headers: {
                    Authorization: `Basic ${encodedKey}`,
                    'Content-Type': 'application/json',
                },
            },
        )
            .then((res) => {
                let resp = res.data.output.text
                setResposta(resp)
                Speech.speak(resp, { language: "pt-BR" } );(res.data.output.text)
            })
            .catch((err) => {
                alert(err)
            });
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
