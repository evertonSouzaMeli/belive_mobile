import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../style/MainStyle';

export default function AgendamentoResultado({route, navigation}) {
    const { data, timestamp } = route.params;

    const [company, setCompany] = useState({})
    const [datetime, setDatetime] = useState(timestamp);
    const [companyList, setCompanyList] = useState([...data]);
    const api = axios.create({baseURL: 'http://localhost:8080'})

    const buscarMedicos = async (value) => {
        try {
            let token = await AsyncStorage.getItem('token');

            console.log('Value')
            console.log(value)

            console.log('specialist')
            console.log(value.doctorList[0].speciality)

            const req = await api.get('/user/company/doctor/avaliable_schedule/list', {
                params: {
                    day: 16,
                    month: 10,
                    cnpj: value.cnpj,
                    specialist: value.doctorList[0].speciality
                },
                headers: {
                    Authorization: token
                }
            })

            let resp = req.data

            if (Array.isArray(resp) && resp.length) {
                navigation.navigate('AgendamentoMedico', { data: req.data, cnpj: value.cnpj }) ;
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
                                    <Text style={estilo.card.info.text} key={index}><b>Nome</b>: {obj.name}</Text>
                                    <Text style={estilo.card.info.text} key={index}><b>CNPJ</b>: {obj.cnpj}</Text>
                                    <Text style={estilo.card.info.text} key={index}><b>CRM</b>: {obj.userLogin.username}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        });
    }

    return (
        <View style={estilo.container}>
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
    title: {
        textAlign: "center",
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 25
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
