import React, { useState, useCallback } from "react";
import styles from '../style/MainStyle';
import ImageCarousel from '../components/carrosel';
import {StyleSheet, Text, View, Button} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DatePicker from 'react-datepicker';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';



export default function Agendamento({navigation}){
const [especialidade, setEspecialidade] = useState("");
const [localidade, setLocalidade] = useState("");

const especialidades = ['--Nenhum--','Anestesista', 'Cardiologista', 'Cirurgião', 'Clinico', 'Dermatologista', 'Endocrino', 'Ginecologista', 'Hematologista', 'Neurologista', 'Oftalmologista', 'Oncologista', 'Ortopedista', 'Pediatra','Psicólogo', 'Psiquiatra', 'Urologista'];
const localidades = ['--Nenhum--','Anestesista', 'Cardiologista', 'Cirurgião', 'Clinico', 'Dermatologista', 'Endocrino', 'Ginecologista', 'Hematologista', 'Neurologista', 'Oftalmologista', 'Oncologista', 'Ortopedista', 'Pediatra','Psicólogo', 'Psiquiatra', 'Urologista'];


const buscar = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Consulta' }] });
    
  };


return (

<KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.perfilContainer}
    keyboardVerticalOffset={80}>
  <ScrollView style={{ width: '100%' }}>
        <View>
            <View style={stylesAgend.picker_view}>
                <Text style={stylesAgend.texto}>Selecione a especialidade:</Text>
                <Picker
                    selectedValue={especialidade}
                    style={stylesAgend.picker_view.picker}
                    onValueChange={(itemValue, itemIndex) => setEspecialidade(itemValue)}
                >
                    {
                        especialidades.map((item, index) => {
                            return <Picker.Item value={item} label={item} key={index}/>
                        })
                    }
                </Picker>
            </View>

            <View style={stylesAgend.picker_view}>
                <Text style={stylesAgend.texto}>Selecione a Data:</Text>
                <Picker
                    selectedValue={localidade}
                    onValueChange={(itemValue, itemIndex) => setLocalidade(itemValue)}
                    style={stylesAgend.picker_view.picker}>
                    {
                        localidades.map((item, index) => {
                            return <Picker.Item value={item} label={item} key={index}/>
                        })
                    }
                </Picker>
            </View>
        </View>

        <View style={{ padding: 20 }}>
            <Button title="Buscar"
                    buttonStyle={stylesAgend.marginButton}
                    onPress={ () => {
                        buscar();
                    }}
            />
        </View>
    </ScrollView>
    </KeyboardAvoidingView>
);
};

const stylesAgend = StyleSheet.create({
    picker_view:{
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
    texto:{
        fontWeight:"bold",
        fontSize:18
    },
    marginButton:{
        height:500
    }
});