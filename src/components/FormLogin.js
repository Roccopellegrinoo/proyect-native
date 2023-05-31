import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }

    logueo(mail, password){
        auth.signInWithEmailAndPassword(mail, password)
        .then(resp => this.props.navigation.navigate('HomeNav'))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <TextInput
            placeholder='Ingresa tu email'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={(text)=> this.setState({email: text})}
            style={styles.input}
        />
        <TextInput
            placeholder='Ingresa tu password'
            keyboardType='default'
            value={this.state.password}
            onChangeText={(text)=> this.setState({password: text})}
            style={styles.input}
            secureTextEntry={true}
        />
        <TouchableOpacity
            onPress={() => this.logueo(this.state.email, this.state.password)}
            style={styles.btn}
        >
            <Text>Ingresar</Text>

        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'red',
        marginVertical: 16,
        padding:10
    },
    btn:{
        backgroundColor:'red',
        padding:16,
        borderRadius:10
    }
})

export default FormLogin