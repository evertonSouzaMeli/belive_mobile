import React from 'react';
import {Text, View} from "react-native";
import { useRoute } from '@react-navigation/native';
import { StyleSheet} from "react-native";


export default function AgendamentoResultado(){
    return(
        <View style={styles.container}>
            <Text>Agendamento Resultado Works</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%'
    }
})
