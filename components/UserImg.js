import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function UserImg (){
  return(
    <View style={styles.container}>
      <MaterialCommunityIcons name="account" size={100}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: 100,
    height: 100,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
}})