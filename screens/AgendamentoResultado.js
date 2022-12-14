import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../style/MainStyle';

export default function AgendamentoResultado({route, navigation}) {
    const { data, day, month} = route.params;

    const [company, setCompany] = useState({})
    const [companyList, setCompanyList] = useState([...data]);
    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})


    const addPlaceholderAvailableSchedule = (value) => {
        let message = "Encontre um horario"

        Array.prototype.insert = function ( index, ...items ) {
            this.splice( index, 0, ...items);
        };

        value.forEach( doctor => doctor.scheduleAvailable.insert(0, message))

        return value;
    }


    const buscarMedicos = async (value) => {
        try {
            let token = await AsyncStorage.getItem('token');

            console.log('Value')
            console.log(value)

            console.log('specialist')
            console.log(value.doctorList[0].speciality)

            const req = await api.get('/user/company/doctor/avaliable_schedule/list', {
                params: {
                    day: day,
                    month: month,
                    cnpj: value.cnpj,
                    specialist: value.doctorList[0].speciality
                },
                headers: {
                    Authorization: token
                }
            })

            let resp = req.data

            if (Array.isArray(resp) && resp.length) {
                navigation.navigate('AgendamentoMedico', { data: addPlaceholderAvailableSchedule(req.data), cnpj: value.cnpj }) ;
            } else {
                alert('Não há especialista para essa data')
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    }


    function results() {
        return companyList.map((obj, index) => {
            return (
                <View style={estilo.contentContainer}>
                    <TouchableOpacity onPress={() => { buscarMedicos(obj) } }>
                        <View style={estilo.card}>
                            <View style={estilo.card.info}>
                                <View style={estilo.card.info.photo}>
                                    <Image style={styles.imagemEmpresa} source={require('../assets/BeLive.png')} />
                                </View>

                                <View style={estilo.card.info.data}>
                                    <Text style={estilo.card.info.text} key={index}>Nome: {obj.name}</Text>
                                    <Text style={estilo.card.info.text} key={index}>CNPJ: {obj.cnpj}</Text>
                                    <Text style={estilo.card.info.text} key={index}>CRM: {obj.userLogin.username}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        });
    }

    return (
        <View style={estilo.contentContainer}>
            { results() }
        </View>
    )
}


const estilo = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal:10,
        justifyContent:'center'
    },
 
    card: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#fbfbfb',
        marginVertical: 20,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 10,
        info: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            text: {
                fontSize: 14
            },
            photo: {
                alignItems: 'center',
                flex: .4
            },
            data: {
                alignContent: 'center',
                justifyContent: 'space-around',
                marginVertical: 10,
                flex: 1,
                paddingLeft: 20
            }
        },
        schedule: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 40
        },

        buttonSchedule: {
            borderRadius: 30,
            fontWeight: 'bold'
        },
        dateText: {
            fontWeight: 'bold',
            fontsize: 18,
            color: '#121212',
        },
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
    }
});
