import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function ButtonMic ({ focused, size}){
  return(
    <View style={[ styles.container, {backgroundColor: focused ? '#1E90FF' : '#C0C0C0'} ]}>
      <MaterialCommunityIcons name="microphone" color={focused ? '#ffffff' : '#121212'} size={size} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: 60,
    height: 60,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})