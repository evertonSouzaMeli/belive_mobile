import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import styles from '../style/MainStyle';
import ImageCarousel from '../components/carrosel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function Home({navigation}) {
    const [user, setUser] = useState({
        name: ''
    });

    const [appointment, setAppointment] = useState(null);

    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})

    useEffect(() => {
        refreshData();
    });


    /*const nextAppointment = async () => {
        try {
            let token = await AsyncStorage.getItem('token');

            let req = await api.get('/appointment/get/next_appointment', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });

            let resp = req.data

            setAppointment(resp);
        } catch (err) {
            alert(err.response.data.message);
        }
    }*/

    const refreshData = async () => {
        try {
            let token = await AsyncStorage.getItem('token');

            let req = await api.get('/user/customer/get', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });

            let resp = req.data

            setUser(resp);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    /*const appointmentCard = () => {
        return (
            <View style={estilo.contentContainer}>
                <Text>Proxima Consulta</Text>
                <View style={estilo.card}>
                    <View style={estilo.card.info}>
                        <View style={estilo.card.info.photo}>
                            <Image style={styles.imagemConsulta} source={require('../assets/BeLive.png')}/>
                        </View>

                        <View style={estilo.card.info.data}>
                            <View style={{marginBottom: 3}}>

                                <Text style={estilo.card.info.text_code}>Código: {appointment.code}</Text>
                            </View>
                            <View>
                                <Text style={estilo.card.info.text}>{appointment.doctor.name}</Text>
                            </View>
                            <View>
                                <Text style={estilo.card.info.text}>CRM: {appointment.doctor.crm}</Text>
                            </View>
                            <View>
                                <Text style={estilo.card.info.text}>Especialidade: {appointment.doctor.speciality}
                                </Text>
                            </View>
                            <View style={{marginVertical: 5}}>
                                <Text style={estilo.card.info.text}>Data: {appointment.startOfAppointment}</Text>
                            </View>
                        </View>
                        {
                            getStatus(appointment.appointmentStatus)

                        }
                    </View>
                    <View style={{
                        marginVertical: 5,
                        paddingVertical: 3,
                        borderRadius: 5
                    }}>
                    </View>

                </View>
            </View>
        )
    }*/

    const noAppointment = () => {
        return (
            <View style={{justifyContent:'center', flex:'1'}}>
                <Text style={estilo.card.info.text}>Você ainda não possui nenhum agendamento.</Text>
            </View>
        )
    }


    const getStatus = (value) => {
        let pill;
        let status;
        let info;

        switch (value) {
            case "IN_PROGRESS":
                pill = {backgroundColor: '#4494ef', borderRadius: 50, padding: 5}
                info = {color: '#ffffff', fontWeight: 'bold', fontSize: 10}
                status = "EM ABERTO"
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
    }


    return (
        <View style={styles.homeContainer}>
            <View style={{marginTop: 20, marginBottom: 20, flex: 2}}>
                <ImageCarousel/>
            </View>
            <View style={{flex: 1, marginBotton: 15, marginTop: 15}}>
                <Text style={estilo.texto}>Bem-vindo(a), {user.name}!</Text>
                <View>
                    { noAppointment() }
                </View>
            </View>
        </View>
    );
}


const estilo = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    card: {
        display: 'flex',
        flexWrap: 'nowrap',
        backgroundColor: '#fbfbfb',
        marginVertical: 20,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -3, height: 6},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 10,

        info: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            text: {
                fontSize: 14,
                fontWeight: 'bold',
            },
            text_code: {
                fontSize: 14,
                color: 'grey',
            },
            photo: {
                alignItems: 'center',
                flex: 0.4,
            },
            data: {
                alignContent: 'center',

                marginVertical: 10,
                flex: 1,
                paddingLeft: 20,
            },
        },
        schedule: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 40,
        },

        buttonSchedule: {
            borderRadius: 30,
            fontWeight: 'bold',
        },
        dateText: {
            fontWeight: 'bold',
            fontsize: 18,
            color: '#121212',
        },
    },
});
