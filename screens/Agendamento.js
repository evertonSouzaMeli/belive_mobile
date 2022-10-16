import React, { useState, useCallback } from 'react';
import styles from '../style/MainStyle';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import axios from "axios";

export default function Agendamento({ navigation }) {
    const [especialidade, setEspecialidade] = useState('');
    const [localidade, setLocalidade] = useState('');

    const [selectedDate, setSelectedDate] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const especialidades = [
        '--Nenhum--',
        'Anestesista',
        'Cardiologista',
        'Cirurgião',
        'Clinico',
        'Dermatologista',
        'Endocrino',
        'Ginecologista',
        'Hematologista',
        'Neurologista',
        'Oftalmologista',
        'Oncologista',
        'Ortopedista',
        'Pediatra',
        'Psicólogo',
        'Psiquiatra',
        'Urologista',
    ];

    const api = axios.create({baseURL: 'http://localhost:8080'})


    const buscar = async () => {
        try {
            let token = await AsyncStorage.getItem('token');

            let req = await api.get('/user/company/get/available_company', {
                params: {
                    specialist: especialidade,
                    day: 16,
                    month: 10
                }, headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });

            /**
             navigation.reset({index: 0, routes: [{name: 'AgendamentoResultado.js', params: { data: req.data, date: datetime } }]});
             **/

            let resp = req.data

            if (Array.isArray(resp) && resp.length) {
                navigation.navigate('AgendamentoResultado', {data: req.data, timestamp: datetime});
            } else {
                alert('Não há especialista para essa data')
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.perfilContainer}
            keyboardVerticalOffset={80}>
            <ScrollView style={{ width: '100%' }}>
                <View>
                    <View style={stylesAgend.picker_view}>
                        <Text style={stylesAgend.texto}>Selecione a especialidade:</Text>
                        <Picker
                            selectedValue={especialidade}
                            style={stylesAgend.picker_view.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setEspecialidade(itemValue)
                            }>
                            {especialidades.map((item, index) => {
                                return <Picker.Item value={item} label={item} key={index} />;
                            })}
                        </Picker>
                    </View>

                    <View style={stylesAgend.picker_view}>
                        <Text style={stylesAgend.texto}>Selecione a Data:</Text>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                                marginBottom: 20
                            }}>
                            <Button title="Calendário" onPress={showDatePicker} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                        <Text style={{fontSize:14}}>{`Data escolhida:  ${selectedDate? moment(selectedDate).format("MM/DD/YYYY"):""}`}</Text>
                    </View>
                </View>

                <View style={{ padding: 20 }}>
                    <Button
                        title="Buscar"
                        buttonStyle={stylesAgend.marginButton}
                        onPress={() => {
                            buscar;
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

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
            marginVertical: 10,
        },
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    marginButton: {
        height: 500,
    },
});
