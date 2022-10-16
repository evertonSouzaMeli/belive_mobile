import React, {useState, useCallback} from "react";
import styles from '../style/MainStyle';
import {StyleSheet, Text, View, Button} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DatePicker from 'react-datepicker';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAvoidingView} from 'react-native';
import {Platform} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Agendamento({navigation}) {
    const [especialidade, setEspecialidade] = useState("");
    const [datetime, setDatetime] = useState(null);

    const especialidades = ['--Nenhum--', 'Anestesista', 'Cardiologista', 'Cirurgião', 'Clinico', 'Dermatologista', 'Endocrino', 'Ginecologista', 'Hematologista', 'Neurologista', 'Oftalmologista', 'Oncologista', 'Ortopedista', 'Pediatra', 'Psicólogo', 'Psiquiatra', 'Urologista'];

    const api = axios.create({baseURL: 'http://localhost:8080'})

    const buscar = async () => {

        console.log('especialidade')
        console.log(especialidade)

        try {
            let token = await AsyncStorage.getItem('token');
            let req = await api.get('user/company/get/available_company', {
                params: {
                    specialist: especialidade, day: 16, month: 10
                }, headers: {
                    Authorization: token, 'Content-Type': 'application/json'
                }
            });

            /**
             navigation.reset({index: 0, routes: [{name: 'AgendamentoResultado.js', params: { data: req.data, date: datetime } }]});
             **/

            let resp = req.data

            console.log(req)
            console.log(resp)

            if (Array.isArray(resp) && resp.length) {
                navigation.navigate('AgendamentoResultado', {data: req.data, timestamp: datetime});
            } else {
                alert('Não há especialista para essa data')
            }

        } catch (err) {
            alert(err.response.data.message);
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.perfilContainer}
            keyboardVerticalOffset={80}>
            <ScrollView style={{width: '100%'}}>
                <View>
                    <View style={stylesAgend.picker_view}>
                        <Text style={stylesAgend.texto}>Selecione a especialidade:</Text>
                        <Picker
                            selectedValue={especialidade}
                            style={stylesAgend.picker_view.picker}
                            onValueChange={(itemValue, itemIndex) => setEspecialidade(itemValue)}>
                            {especialidades.map((item, index) => {
                                return <Picker.Item value={item} label={item} key={index}/>
                            })}
                        </Picker>
                    </View>


                    <View style={stylesAgend.picker_view}>
                        <Text style={stylesAgend.texto}>Selecione a especialidade:</Text>
                        <Picker
                            selectedValue={especialidade}
                            mode="dropdown"
                            style={stylesAgend.picker_view.picker}
                            onValueChange={(itemValue, itemIndex) => setEspecialidade(itemValue)}>
                            {especialidades.map((item, index) => {
                                return <Picker.Item value={item} label={item} key={index}/>
                            })}
                        </Picker>
                    </View>

                </View>
                <View style={{padding: 20}}>
                    <Button title="Buscar"
                            buttonStyle={stylesAgend.marginButton}
                            onPress={buscar}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>);
};

const stylesAgend = StyleSheet.create({
    picker_view: {
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 20,
        picker: {
            height: 50,
            borderColor: '#D5D5D5',
            borderWidth: 2,
            padding: 5,
            borderRadius: 5,
            marginVertical: 10
        }
    },
    texto: {
        fontWeight: "bold",
        fontSize: 18
    },
    marginButton: {
        height: 500
    }
});
