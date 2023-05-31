import { Text, View, TouchableOpacity} from 'react-native'
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
      <View>
        <FormRegister navigation={this.props.navigation}/>
        <Text>
            Ya tienes cuenta? 
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Login')}
            >
                <Text>Ingresa aquí</Text>
            </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

export default Register