import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputNombre: '',
            inputMail: '',
            inputDireccion: '',
            inputTelefono: '',
            inputPassword: '',
        }
    }
    
    validarCampo(texto) {
        return texto.length >= 3
    }

    validarTelefono(numero) {
        let numstring = numero.toString()
        return numstring.length === 10
    }

    registrarUsuario(mail, password) {

        if (!this.validarCampo(mail)) {
            console.log('Longitud de email no válida.');
        }

        if (!this.validarCampo(password)) {
            console.log('Longitud de password no válida.');
        }

        if (!this.validarCampo(this.state.inputNombre)) {
            console.log('Longitud de nombre no válida.');
        }

        if (!this.validarCampo(this.state.inputDireccion)) {
            console.log('Longitud de dirección no válida.');
        }

        if (!this.validarTelefono(this.state.inputTelefono)) {
            console.log('Longitud de teléfono no válida.');
        }

        auth.createUserWithEmailAndPassword(mail, password)
            .then(data => {
                this.props.navigation.navigate('HomeNav')
                db.collection('users').add({
                    name: this.state.inputNombre,
                    email: this.state.inputMail,
                    address: this.state.inputDireccion,
                    phone: this.state.inputTelefono,
                    createdAt: Date.now()
                })
                    .then(resp => console.log(resp))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }



    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.title}>Registrar</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre completo'
                    keyboardType='default'
                    onChangeText={(text) => this.setState({ inputNombre: text })}
                    value={this.state.inputNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={(text) => this.setState({ inputMail: text })}
                    value={this.state.inputMail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Dirección'
                    keyboardType='default'
                    onChangeText={(text) => this.setState({ inputDireccion: text })}
                    value={this.state.inputDireccion}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Teléfono'
                    keyboardType='numeric'
                    onChangeText={(text) => this.setState({ inputTelefono: text })}
                    value={this.state.inputTelefono}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                    value={this.state.inputPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword)}
                >
                    <Text style={styles.btnText}>Registrar mi usuario</Text>
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