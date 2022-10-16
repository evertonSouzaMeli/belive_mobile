import {Button, Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/MainStyle";
import {Picker} from "@react-native-picker/picker";


export default function AgendamentoMedico({navigation, route}) {
    const {data, cnpj} = route.params;
    const [doctorList, setDoctorList] = useState([...data]);
    const [timestamp, setTimestamp] = useState({key: 0, date: null});

    const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})


    const marcarConsulta = async (value) => {
        try {
            alert(timestamp.date)

            let token = await AsyncStorage.getItem('token');
            let obj = {
                companyDTO: {
                    cnpj: cnpj
                },
                doctor: {
                    crm: value.crm
                },
                startOfAppointment: timestamp.date
            }

            const req = await api.post('http://localhost:8080/appointment/create', obj, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            })

            alert('Consulta marcada com sucesso!')

            navigation.navigate('Principal');

        } catch (err) {
            console.log(err.response)
            alert(err.response.data.message);
        }
    }

    function results() {
        return doctorList.map((obj, index) => {
            return (
                <View style={estilo.contentContainer}>
                    <View style={estilo.card}>
                        <View style={estilo.card.info}>
                            <View style={estilo.card.info.photo}>
                                <Image style={styles.imagemEmpresa} source={require('../assets/BeLive.png')}/>
                            </View>

                            <View style={estilo.card.info.data}>
                                <Text style={estilo.card.info.text} key={index}><b>Nome</b>: {obj.name}</Text>
                                <Text style={estilo.card.info.text} key={index}><b>CRM</b>: {obj.crm}</Text>
                                <Text style={estilo.card.info.text} key={index}><b>Especialidade</b>: {obj.speciality}
                                </Text>
                            </View>


                        </View>
                        <View>
                            <Picker
                                selectedValue={timestamp[index]}
                                mode="dropdown"
                                style={estilo.picker_view.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setTimestamp({key: itemIndex, date: itemValue});
                                }}>
                                {obj.scheduleAvailable.map( (item, index) => {
                                    return <Picker.Item value={item} label={item} key={index}/>
                                })}
                            </Picker>
                        </View>
                        <View>
                            <Button title="Confirmar" onPress={() => {
                                marcarConsulta(obj)
                            }}/>
                        </View>
                    </View>
                </View>
            )
        })
    }

    return (
        <View>
            {results()}
        </View>
    )
}

const estilo = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center'
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
        }
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
});
