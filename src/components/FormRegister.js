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

    registrarUsuario(mail, password) {
        auth.createUserWithEmailAndPassword(mail, password)
            .then(data => {
                this.props.navigation.navigate('HomeNav')
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now()
                })
                    .then(resp => console.log(resp))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    validarCampo(texto) {
        return text.length >= 3
    }

    validarTelefono(numero) {
        let numstring = numero.toString()
        return numstring.length === 10
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.title}>Registrar</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    keyboardType='default'
                    onChange={(text) => {
                        if (this.validarCampo(texto)) {
                            this.setState({ inputNombre: text })
                        } else {
                            console.log('Longitud de nombre no válida.');
                        }
                    }}
                    value={this.state.inputNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={(text) => {
                        if (this.validarCampo(text)) {
                            this.setState({ inputMail: text })
                        } else {
                            console.log('Longitud de email no válida.');
                        }
                    }}
                    value={this.state.inputMail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Dirección'
                    keyboardType='default'
                    onChange={(text) => {
                        if (this.validarCampo(texto)) {
                            this.setState({ inputDireccion: text })
                        } else {
                            console.log('Longitud de dirección no válida.');
                        }
                    }}
                    value={this.state.inputDireccion}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Teléfono'
                    keyboardType='numeric'
                    onChange={(text) => {
                        if (this.validarTelefono(texto)) {
                            this.setState({ inputTelefono: text })
                        } else {
                            console.log('Longitud de teléfono no válida.');
                        }
                    }}
                    value={this.state.inputTelefono}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={(text) => {
                        if (this.validarCampo(text)) {
                            this.setState({ inputPassword: text })
                        } else {
                            console.log('Longitud de contraseña no válida.');
                        }
                    }}
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
        width: '40%',
        marginTop: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#151515',
        borderRadius: 5,
        width: '90%',
        marginTop: 24,
        height: 24,
        padding: 5
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
        color: 'black',
        fontSize: 24,
    },
})