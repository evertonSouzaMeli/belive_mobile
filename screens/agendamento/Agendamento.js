import React, { useState, useCallback } from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import {Picker} from "react-native-web";
import { useRoute } from '@react-navigation/native';
import mainStyles from "../../style/MainStyle";


export default function Agendamento(){
const [especialidade, setEspecialidade] = useState("");
const [localidade, setLocalidade] = useState("");

const especialidades = ['Pediatria', 'Ortopedia'];
const localidades = ['Zona Sul', 'Centro', 'Zona Norte', 'Zona Leste', 'Zona Oeste'];


const buscar = () => {
   // let resultado = { ...localidade, ...especialidade }

    navigation.navigate('AgendamentoResultado');

    //enviar resultado
};

return (
    <View style={styles.container}>

        <View>
            <View style={styles.picker_view}>
                <Text style={styles.texto}>Selecione a especialidade:</Text>
                <Picker
                    selectedValue={especialidade}
                    style={styles.picker_view.picker}
                    onValueChange={(itemValue, itemIndex) => setEspecialidade(itemValue)}
                >
                    {
                        especialidades.map((item, index) => {
                            return <Picker.Item value={item} label={item} key={index}/>
                        })
                    }
                </Picker>
            </View>

            <View style={styles.picker_view}>
                <Text style={styles.texto}>Selecione a Região:</Text>
                <Picker
                    selectedValue={localidade}
                    onValueChange={(itemValue, itemIndex) => setLocalidade(itemValue)}
                    style={styles.picker_view.picker}>
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
                    buttonStyle={styles.marginButton}
                    onPress={ () => {
                        buscar();
                    }}
            />
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        justifyContent: 'space-around'
    },
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
