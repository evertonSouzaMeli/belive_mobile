import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserImg from "../components/UserImg";

export default function AgendamentoResultado({route, navigation}) {
    const { data, timestamp } = route.params;

    const [company, setCompany] = useState({})
    const [datetime, setDatetime] = useState(timestamp);
    const [companyList, setCompanyList] = useState([...data]);
    const api = axios.create({baseURL: 'http://localhost:8080'})


    const buscarMedicos = async (value) => {
        try {
            let token = await AsyncStorage.getItem('token');

            const req = await api.get('/user/company/doctor/avaliable_schedule/list', {
                params: {
                    day: datetime['day'],
                    month: datetime['month'],
                    cnpj: value.cnpj,
                    specialist: value.specialist
                },
                headers: {
                    Authorization: token
                }
            })

            navigation.navigate('AgendamentoMedico', { data: req.data }) ;

        } catch (err) {
            alert(err.response.data.message);
        }
    }


    function results() {
        return companyList.map((obj, index) => {
            return (
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={buscarMedicos}>
                        <View style={styles.card}>
                            <View style={styles.card.info}>
                                <View style={styles.card.info.photo}>
                                    <UserImg/>
                                </View>

                                <View style={styles.card.info.data}>
                                    <Text style={styles.card.info.text} key={index}><b>Nome</b>: {obj.name}</Text>
                                    <Text style={styles.card.info.text} key={index}><b>CNPJ</b>: {obj.cnpj}</Text>
                                    <Text style={styles.card.info.text} key={index}><b>CRM</b>: {obj.userLogin.username}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        });
    }

    return (
        <View style={styles.container}>
            { results() }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginHorizontal: 20,
        flexWrap: 'wrap'
    },
    title: {
        textAlign: "center",
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 25
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20
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
            text: {
                fontSize: 18
            },
            photo: {
                paddingHorizontal: 10

            },
            data: {
                alignContent: 'center',
                justifyContent: 'space-around',
                marginVertical: 10
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
