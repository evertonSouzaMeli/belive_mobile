import axios from "axios";
import base64 from "react-native-base64";
import audio from '../assets/audio-file.flac';


const key = "lnDoK1zx2UMQ-dRiiDulakjxpWLEUb3sUdAG3SOIPjoQ"
const encodedKey = base64.encode(`apikey:${key}`)

export const speechToText = () => {
    axios
        .post("https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/8d01546c-8cfa-4611-98f9-3e7ead090faf/v1/recognize", {
            "C:\Users\user\WebstormProjects\belive_mobile\assets\audio-file.flac"
        },{
            headers:{
                Authorization: `Basic ${encodedKey}`,
                'Content-Type': 'audio/flac'
            }
        }).then( res => {
            alert("Deu certo")
            console.log(res)
        }).catch(err => {
            alert("Deu errado" + err.response.data.error)
            console.log(err)
    })
}