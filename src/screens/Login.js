import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'
import { auth } from '../firebase/config'

class Login extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeNav')
      }
    })
  }
  
  render() {
    return (
      <View style={styles.contenedor}>
        <FormLogin navigation={this.props.navigation} />
        <Text style={styles.text}>
            Aún no tienes una cuenta?<Text> </Text>
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Register')}
            >
                <Text style={styles.btnText}>Registrate aquí</Text>
            </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

export default Login

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