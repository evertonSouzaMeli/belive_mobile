import axios from "axios";
import base64 from "react-native-base64";
import * as Speech from 'expo-speech';
import {useState} from "react";
import {Button, TextInput, View} from "react-native";


const key = "lnDoK1zx2UMQ-dRiiDulakjxpWLEUb3sUdAG3SOIPjoQ"
const encodedKey = base64.encode(`apikey:${key}`)

export default function SpeechToText() {

}