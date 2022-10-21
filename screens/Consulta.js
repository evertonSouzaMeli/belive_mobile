import * as React from 'react';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from "@react-native-picker/picker";

export default function Consulta({navigation}) {
    const [appointmentList, setAppointmentList] = useState([])
    const [active, setActive] = useState(false)
    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})

    useEffect(() => {
        refreshData();
    })

    const editar = () => {
        navigation.navigate('Consulta');
    };

    const cancelAppointment = async (value) => {
        try {
            let token = await AsyncStorage.getItem('token');

            alert(token)

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
            console.log(err.response.data.message)
            alert(err.response.data.message);
        }
    }

    const refreshData = async () => {
        try {
            let token = AsyncStorage.getItem('token');
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

    /** function results() {   **/
    return appointmentList.map((obj, index) => {
        return (
            <View style={estilo.contentContainer}>
                <View style={estilo.card}>
                    <View style={estilo.card.info}>
                        <View style={estilo.card.info.photo}>
                            <Image style={styles.imagemEmpresa} source={require('../assets/BeLive.png')}/>
                        </View>

                        <View style={estilo.card.info.data}>
                            <Text style={estilo.card.info.text} key={index}>Nome: {obj.doctor.name}</Text>
                            <Text style={estilo.card.info.text} key={index}>CRM: {obj.doctor.crm}</Text>
                            <Text style={estilo.card.info.text} key={index}>Especialidade: {obj.doctor.speciality}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 5,
                        paddingVertical: 3,
                        borderWidth: 2,
                        borderColor: '#BBBBBB',
                        borderRadius: 5
                    }}>
                    </View>
                    <View>
                        <Button title="Editar" onPress={() => {
                            cancelAppointment(obj);
                        }}/>
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
        }
    }
});