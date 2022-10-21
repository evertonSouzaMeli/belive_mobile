import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import styles from '../style/MainStyle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Consulta({navigation}) {
    const [appointmentList, setAppointmentList] = useState([])
    const [active, setActive] = useState(false)
    //const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})
    const api = axios.create({baseURL: 'https://localhost:8080'})

    useEffect(() => {
        refreshData();
    })

    const editar = () => {
        navigation.navigate('Consulta');
    };

    const cancelAppointment = async (value) => {
        try {
            let token = await AsyncStorage.getItem('token');

            console.log(value.code)

            let req = await api.get('/appointment/cancel', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }, params: {
                    code: value.code
                }
            });

            refreshData();
        } catch (err) {
            alert(err.response.data.message)
            console.log(err.response.data.message)
        }
    }

    const refreshData = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            let req = await api.get('/appointment/get/list', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });

            let res = req.data;

            setAppointmentList([...res])

        } catch (err) {
            console.log(err.response)
            alert(err.response.data.message);
        }
    }

    const getStatus = (value) => {
        let pill;
        let status;
        let info;

        switch (value) {
            case "IN_PROGRESS":
                pill = {backgroundColor: '#4494ef', borderRadius: 50, padding: 5}
                info = {color: '#ffffff', fontWeight: 'bold', fontSize: 10}
                status = "EM PROGRESSO"
                break;
            case "CANCELLED":
                pill = {backgroundColor: '#ef5858', borderRadius: 50, padding: 5}
                info = {color: '#ffffff', fontWeight: 'bold', fontSize: 10}
                status = "CANCELADA"
                break;
            default :
                pill = {backgroundColor: 'grey', borderRadius: 50, padding: 5}
                info = {color: '#000000', fontWeight: 'bold', fontSize: 10}

                status = "NÃO DEFINIDO"
                break;
        }

        return (
            <View style={pill}>
                <Text style={info}>{status}</Text>
            </View>
        )
    }

    /** function results() {   **/
    return appointmentList.map((obj, index) => {
        return (
            <View style={estilo.contentContainer}>
                <View style={estilo.card}>
                    <View style={estilo.card.info}>
                        <View style={estilo.card.info.photo}>
                            <Image style={styles.imagemConsulta} source={require('../assets/BeLive.png')}/>
                        </View>

                        <View style={estilo.card.info.data}>
                            <View style={{ marginBottom: 3}}>
                                <Text style={estilo.card.info.text_code} key={index}>Código: {obj.code}</Text>
                            </View>
                            <View>
                                <Text style={estilo.card.info.text} key={index}>{obj.doctor.name}</Text>
                            </View>
                            <View>
                                <Text style={estilo.card.info.text} key={index}>CRM: {obj.doctor.crm}</Text>
                            </View>
                            <View>
                                <Text style={estilo.card.info.text} key={index}>Especialidade: {obj.doctor.speciality}
                                </Text>
                            </View>
                        </View>
                        {
                            getStatus(obj.appointmentStatus)
                        }
                    </View>
                    <View style={{
                        marginVertical: 5,
                        paddingVertical: 3,
                        borderRadius: 5
                    }}>
                    </View>

                    <View>
                        {
                            obj.appointmentStatus !== 'CANCELLED'
                                ? <Button title="Cancelar" buttonStyle={{backgroundColor: "#ef5858"}} onPress={() => {
                                    cancelAppointment(obj);
                                }}/>
                                : <Button title="Cancelar" buttonStyle={{backgroundColor: "grey"}}/>
                        }
                    </View>
                </View>
            </View>
        )
    })
}
/**
 return (
 <View style={estilo.contentContainer}>
 {results()}
 </View>
 )
 **/


const estilo = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
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
                fontSize: 14,
                fontWeight: 'bold'
            },
            text_code: {
                fontSize: 14,
                color: 'grey'
            },
            photo: {
                alignItems: 'center',
                flex: .4
            },
            data: {
                alignContent: 'center',

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
        }
    }
});