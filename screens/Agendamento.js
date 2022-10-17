import React, {useState} from "react";
import styles from '../style/MainStyle';
import {Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {ScrollView} from 'react-native-gesture-handler';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Agendamento({navigation}) {
    const [especialidade, setEspecialidade] = useState("");
    const [day, setDay] = useState(0)
    const [month, setMonth] = useState('')

    const especialidades = ['--Nenhum--', 'Anestesista', 'Cardiologista', 'Cirurgião', 'Clinico', 'Dermatologista', 'Endocrino', 'Ginecologista', 'Hematologista', 'Neurologista', 'Oftalmologista', 'Oncologista', 'Ortopedista', 'Pediatra', 'Psicólogo', 'Psiquiatra', 'Urologista'];

    const months = ['--Nenhum---', 'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO']

    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})

    const transformMonth = (month) => {
        let monthValue = 0;

        switch (month) {
            case 'JANEIRO':
                monthValue = 1;
                break;
            case 'FEVEREIRO':
                monthValue = 2;
                break;
            case 'MARÇO':
                monthValue = 3;
                break;
            case 'ABRIL':
                monthValue = 4;
                break;
            case 'MAIO':
                monthValue = 5;
                break;
            case 'JUNHO':
                monthValue = 6;
                break
            case 'JULHO':
                monthValue = 7;
                break
            case 'AGOSTO':
                monthValue = 8;
                break
            case 'SETEMBRO':
                monthValue = 9;
                break;
            case 'OUTUBRO':
                monthValue = 10;
                break;
            case 'NOVEMBRO':
                monthValue = 11;
                break;
            case 'DEZEMBRO':
                monthValue = 12;
                break
            default:
                monthValue = -1;
                break;
        }

        return monthValue;
    }

    const buscar = async () => {
        let obj = {
            day: day,
            month: transformMonth(month)
        }

        try {
            let token = await AsyncStorage.getItem('token');
            let req = await api.get('user/company/get/available_company', {
                params: {
                    specialist: especialidade, day: obj.day, month: obj.month
                }, headers: {
                    Authorization: token, 'Content-Type': 'application/json'
                }
            });

            let resp = req.data

            if (Array.isArray(resp) && resp.length) {
                navigation.navigate('AgendamentoResultado', {data: req.data, day: obj.day, month: obj.month });
            } else {
                alert('Não há especialista para essa data')
            }

        } catch (err) {
            alert(err);
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
                        <Text style={stylesAgend.texto}>Selecione um mês:</Text>
                        <Picker
                            selectedValue={month}
                            mode="dropdown"
                            style={stylesAgend.picker_view.picker}
                            onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}>
                            {months.map((item, index) => {
                                return <Picker.Item value={item} label={item} key={index}/>
                            })}
                        </Picker>
                    </View>

                    <View style={stylesAgend.picker_view}>
                        <Text style={stylesAgend.texto}>Insira um dia:</Text>
                        <TextInput placeholder={"Insira um dia valido"} onChangeText={ value => { setDay(value)}}/>
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
