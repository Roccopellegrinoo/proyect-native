import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'

class Register extends Component {

  render() {
    return (
      <View style={styles.contenedor}>
        <FormRegister navigation={this.props.navigation} />
        <Text style={styles.text}>
          ¿Ya tienes cuenta?<Text> </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.btnText}>Ingresa aquí</Text>
          </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

export default Register

const styles = StyleSheet.create({
  contenedor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#74549B',
    height: '100vh'
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
})