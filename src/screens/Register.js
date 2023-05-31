import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { auth } from '../firebase/config'

class Register extends Component {

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.props.navigation.navigate('HomeNav')
            }
        })
    }

  render() {
    return (
      <View style={styles.contenedor}>
        <FormRegister navigation={this.props.navigation}/>
        <Text style={styles.btnText}>
            ¿Ya tienes cuenta? 
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Login')}
            >
                <Text style={styles.btnText}> Ingresa aquí</Text>
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
    backgroundColor: '#74549B'
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
  }
})