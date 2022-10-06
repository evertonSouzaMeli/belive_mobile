import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

  imagem:{
    width: 200,
    height: 200,
  },
  buttonEntrar: {
    marginTop: 10,
    textAlign: 'center',
    alignContent: 'center',
    paddingHorizontal: 20
  },

  buttonVoltar: {
    marginTop: 10,
    textAlign: 'center',
    alignContent: 'center',
    paddingHorizontal: 24
  },

  visao:{
    width: '100%'
  },

  buttonCadastrar: {
    backgroundColor: '#228B22',
    marginTop: 10,
    textAlign: 'center',
    alignContent: 'center',
    padding: 10
  },
  buttonApagar: {
    backgroundColor: '#FF0000',
    marginTop: 20,
    textAlign: 'center',
    alignContent: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerSuporte: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  suporteContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },

  perfilContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  suporteContainer1: {
    backgroundColor: '#fff',
    justifyContent: 'center'
  },

  pefilTopContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  maskedInput: {
    flexGrow: 1,
    height: 40,
    fontSize: 18,
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    borderStyle: "solid",
    alignSelf: "flex-start"
  },

  containerMask: {
    flexDirection: "row",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },

  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 15,
    color: "#f00",
    fontSize: 12
  }
});

export default styles
