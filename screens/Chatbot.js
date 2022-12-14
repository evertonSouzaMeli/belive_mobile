import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Audio} from "expo-av";
import * as Speech from "expo-speech";
import axios from "axios";
import base64 from 'react-native-base64';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {
    const [permission, setPermission] = React.useState("");
    const [recording, setRecording] = React.useState("");
    const [rec, setRec] = React.useState(false);

    const especialidades = [
        'Anestesista',
        'Cardiologista',
        'Cirurgião',
        'Clinico',
        'Dermatologista',
        'Endocrino',
        'Ginecologista',
        'Hematologista',
        'Neurologista',
        'Oftalmologista',
        'Oncologista',
        'Ortopedista',
        'Pediatra',
        'Psicólogo',
        'Psiquiatra',
        'Urologista',
    ];

    const [userInput, setUserInput] = React.useState("");
    const [botResponse, setBotResponse] = React.useState("")

    React.useEffect(() => { Speech.speak(botResponse) }, [botResponse])

    const sendMessageToChatbot = async (value) => {
        const key = "PJzIsPSS51vZx8VoQLdwyuXXvOZZd52uOUBp1KWmyZTu"
        const encodedKey = base64.encode(`apikey:${key}`)
        const baseUrl = 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/11a13d07-78ef-4242-89cc-782d5bd13ceb/v1/workspaces/2f75e230-f055-4276-a75b-b2c2ae8ba53a/message'

        try{
            const request = await axios.post(baseUrl.concat('?version=2018-09-20'),
                { input: { text: value}},
                { headers: { Authorization: `Basic ${encodedKey}`, 'Content-Type': 'application/json' } });

            const response = request.data.output.text[0]

            if(response.includes('especialidade'))

            if(response === undefined) Speech.speak('Eu não entendi, você pode reformular a frase')
            setBotResponse(response)
        }

        catch(err){
            console.log(err)
        }
    }

    const speechToText = (recording) => {
        const formData = new FormData();
        formData.append("file", {
            uri: recording.getURI(),
            name: "test.wav",
            type: "audio/wav",
        });
        axios
            .post('https://nodered-app-1tdsr-fiap-2021.mybluemix.net/transcription', formData, {
                responseType: 'text',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setUserInput(response.data)
                sendMessageToChatbot(response.data)
            })
            .catch(function (error) {
                console.log(error);
                console.error(error.response);
            });
    }

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === "granted") {
                setRec(true)
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                const recording = new Audio.Recording();
                try {
                    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                    await recording.startAsync();
                } catch (err) {
                    console.log(err)
                }
                setRecording(recording)
            } else {
                setPermission("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    }

    async function stopRecording() {
        setRec(false)
        await recording.stopAndUnloadAsync();
        let resp = recording
        setRecording(undefined)
        speechToText(resp)
    }

    return (
        <View style={styles.container}>
            <Text>{permission}</Text>

            <View>
                <TouchableOpacity style={styles.recordButton} onLongPress={startRecording} onPressOut={stopRecording} delayLongPress={250}>
                    {
                        !rec ?  <Icon name={"microphone"}  size={75} color="white" /> : <Icon name={"stop"}  size={75} color="white" />
                    }
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    recordButton: {
        borderWidth:1,
        borderColor:'#EC2E2E',
        alignItems:'center',
        justifyContent:'center',
        width:200,
        height:200,
        borderRadius: 100,
        backgroundColor: "#EC2E2E"
    }
});
