import {Text, View, StyleSheet, Button } from "react-native";
import * as React from "react";
import UserImg from "../../components/UserImg";


export default function AgendamentoConfirmacao(){
    function fillInfo() {
        let listInfo = []

        let randomNumber = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) };

        function fillSchedule(loop){
            let listOfSchedule = []

            for (let i = 0; i < loop; i++)
                listOfSchedule.push(`${randomNumber(7, 20)}`.concat(":").concat(`${randomNumber(10, 59)}`))

            return listOfSchedule;
        }

        for (let i = 0; i < 4 ; i++){
            listInfo.push({
                    date: new Date().toLocaleDateString(),
                    name: `doctor_${randomNumber(1, 10)}`,
                    crm:  randomNumber(10000, 99999),
                    schedule: fillSchedule(3),
                });
        }


        const listOfSchedule = (obj) => {
            return obj.schedule.map((date, index) => {
                    return ( <Button style={styles.card.buttonSchedule} title={date} key={index}/>);
            })
        }


        return listInfo.map((obj, index) => {

            const key = index;
            return (
                <View style={styles.contentContainer}>
                    <View style={styles.card}>
                        <View style={styles.card.info}>
                            <View style={styles.card.info.photo}>
                                <UserImg/>
                            </View>

                            <View style={styles.card.info.data}>
                                <Text style={styles.card.dateText} key={key}>{obj.date}</Text>
                                <Text style={styles.card.info.text} key={key}>Nome: {obj.name}</Text>
                                <Text style={styles.card.info.text} key={key}>CRM: {obj.crm}</Text>
                            </View>
                        </View>

                        <View style={styles.card.schedule}>
                            { listOfSchedule(obj) }
                        </View>

                    </View>
                </View>
            )
        });
    }

        return(
            <View style={{backgroundColor:'#ffff'}}>
                <Text style={styles.title}>Escolha Melhor Horario</Text>
                { fillInfo() }
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        marginHorizontal: 20,
        flexWrap: 'wrap'
    },
    title: {
        textAlign: "center",
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 25
    },
    contentContainer:{
        flex:1,
        paddingHorizontal:20,
        backgroundColor: '#ffff'
    },
    card: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#f1f1f1',
        marginVertical: 20,
        borderRadius: 35,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 10,
        info:{
            display: 'flex',
            flexDirection: 'row',
            text: {
              fontSize: 18
            },
            photo: {
                paddingHorizontal: 10

            },
            data: {
                alignContent:'center',
                justifyContent:'space-around',
                marginVertical: 10
            }

        },
        schedule:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 40
        },

        buttonSchedule:{
            borderRadius: 30,
            fontWeight: 'bold'
        },
        dateText:{
            fontWeight:'bold',
            fontsize:18,
            color: '#121212',
        }
    }
})
