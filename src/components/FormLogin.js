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

    logueo(mail, password){

    this.setState({ inputError: '', authError: '' })

        if (mail === '' || password === '') {
            console.log("Todos los campos son obligatorios.")
            this.setState({ inputError: 'Todos los campos son obligatorios.' })
            return false
        } else {
            auth.signInWithEmailAndPassword(mail, password)
                .then(resp => this.props.navigation.navigate('HomeNav'))
                .catch(err => {
                    console.log(err)
                    this.setState({ authError: err.message })
                })
        }

  render() 
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
            style = {
                this.state.inputEmail !== '' && this.state.inputContraseña !== '' ?
                styles.btnH : 
                styles.btnD
            }
        >
                    <Text style={styles.btnText}>Ingresar</Text>

        </TouchableOpacity>
        {
            this.state.inputError !== '' || this.state.authError !== '' ?
            <Text
                style={styles.error}
            >
                {this.state.inputError}
                {this.state.authError}
            </Text> :
            null
        }
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
    btnD: {
        marginTop: 32,
        backgroundColor: '#3e3e3e',
        padding: 10,
        borderRadius: 20,
        margin: 5,
    },
    btnH: {
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
    error: {
        color: 'red',
    }
})

export default FormLogin