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
    const [timestampList, setTimestampList] = useState([{}])
    const [timestamp, setTimestamp] = useState({});

    //const api = axios.create({baseURL: 'https://believe-backend.azurewebsites.net'})
    const api = axios.create({baseURL: 'http://localhost:8080'})

    const marcarConsulta = async (index, value) => {
        try {
            let date = findById(index);
            let token = await AsyncStorage.getItem('token');
            let obj = {
                companyDTO: {
                    cnpj: cnpj
                },
                doctor: {
                    crm: value.crm
                },
                startOfAppointment: date
            }

            const req = await api.post('/appointment/create', obj, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                },
            })

            alert('Consulta marcada com sucesso!')

            navigation.navigate('Principal');

        } catch (err) {
            console.log(err.response)
            alert(err.response.data.message);
        }
    }

    const findById = (index) => {
        return timestampList[index];
    }

    const save = (index, value) => {
        let tempList = [...timestampList]
        tempList.splice(index, 1, value)
        setTimestampList(tempList);
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
                                <Text style={estilo.card.info.text} key={index}>Nome: {obj.name}</Text>
                                <Text style={estilo.card.info.text} key={index}>CRM: {obj.crm}</Text>
                                <Text style={estilo.card.info.text} key={index}>Especialidade: {obj.speciality}
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
                            <Picker
                                selectedValue={findById(index)}
                                mode="dropdown"
                                itemStyle={{backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17}}
                                onValueChange={(itemValue, itemIndex) => {
                                    save(index, itemValue)
                                }}>
                                {obj.scheduleAvailable.map((item, index) => {
                                    return <Picker.Item value={item} label={item} key={index}/>
                                })}
                            </Picker>
                        </View>
                        <View>
                            <Button title="Confirmar" onPress={() => {
                                marcarConsulta(index, obj)
                            }}/>
                        </View>
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={estilo.contentContainer}>
            {results()}
        </View>
    )
}

const estilo = StyleSheet.create({
    contentContainer: {
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
