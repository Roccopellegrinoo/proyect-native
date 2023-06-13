import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state={
            inputEmail:'',
            inputContraseña:''
        }
    }
    validarCampo(texto) {
        return texto.length >= 3
    }
    logueo(mail, password){
        if (!this.validarCampo(mail)) {
            console.log('Longitud de email no válida.');
        }

        if (!this.validarCampo(password)) {
            console.log('Longitud de password no válida.');
        }
        auth.signInWithEmailAndPassword(mail, password)
        .then(resp => this.props.navigation.navigate('HomeNav'))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.title}>Ingresar</Text>
        <TextInput
            placeholder='Ingresa tu email'
            keyboardType='email-address'
            value={this.state.inputEmail}
            onChangeText={(text)=> this.setState({inputEmail: text})}
            style={styles.input}
        />
        <TextInput
            placeholder='Contraseña'
            keyboardType='password'
            value={this.state.inputContraseña}
            onChangeText={(text) => this.setState({ inputContraseña: text })}
            style={styles.input}
            secureTextEntry={true}
        />
        <TouchableOpacity
            onPress={() => this.logueo(this.state.inputEmail, this.state.inputContraseña)}
            style={styles.btn}
        >
                    <Text style={styles.btnText}>Ingresar</Text>

        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    contenedor: {
        width: '30%',
        marginTop: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: '5vh',
        paddingBottom: 10,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#151515',
        borderRadius: 5,
        width: '90%',
        marginTop: 24,
        height: 24,
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    btn: {
        marginTop: 32,
        backgroundColor: '#74549B',
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#151515',
        fontSize: 24,
    },
})

export default FormLogin