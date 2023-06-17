import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputNombre: '',
            inputMail: '',
            inputBio: '',
            inputDireccion: '',
            inputTelefono: '',
            inputContraseña: '',
            inputError: '',
            authError: '',
            setDocumentError: '',
        }
    }

    registrarUsuario(mail, contraseña){

        this.setState({ inputError: '', authError: '', setDocumentError: '' })

        if (this.state.inputNombre === '' || this.state.inputMail === '' || this.state.inputContraseña === '') {
            console.log("Los campos señalados son obligatorios.")
            this.setState({ inputError: 'Los campos señalados son obligatorios.' })
            return false
        } else {
            auth.createUserWithEmailAndPassword(mail, contraseña)
                .then( data => {
                    this.props.navigation.navigate('HomeNav')
                    db.collection('users').add({
                        name: this.state.inputNombre,
                        email: auth.currentUser.email, 
                        bio: this.state.inputBio,
                        address: this.state.inputDireccion,
                        phone: this.state.inputTelefono,
                        createdAt: Date.now()
                    })
                    .then(resp => console.log(resp))
                    .catch(err => {
                        console.log(err)
                        this.setState({ setCollectionError: 'Ocurrió un error al agregar tus datos' })
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ authError: 'Ocurrió un error al registrar tu usuario' })
                })
        }

    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.title}>Regístrate</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre completo*'
                    keyboardType='default'
                    onChangeText={(text) => this.setState({ inputNombre: text })}
                    value={this.state.inputNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email*'
                    keyboardType='email-address'
                    onChangeText={(text) => this.setState({ inputMail: text })}
                    value={this.state.inputMail}
                />
                <TextInput
                    style={styles.input_area}
                    placeholder='Mini bio'
                    keyboardType='default'
                    onChangeText={(text) => this.setState({ inputBio: text })}
                    value={this.state.inputBio}
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
                    placeholder='Contraseña*'
                    onChangeText={(text) => this.setState({ inputContraseña: text })}
                    value={this.state.inputContraseña}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style = {
                        this.state.inputNombre === '' && this.state.inputMail === '' && this.state.inputContraseña === '' ?
                        styles.btnH : 
                        styles.btnD
                    }
                    onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputContraseña)}
                >
                    <Text style={styles.btnText}>Registrar mi usuario</Text>
                </TouchableOpacity>
                {
                    this.state.inputError !== '' || this.state.authError !== ''  || this.state.setDocumentError !== '' ?
                    <Text
                        style={styles.error}
                    >
                        {this.state.inputError}
                        {this.state.authError}
                        {this.state.setDocumentError}    
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
    input_area: {
        borderWidth: 1,
        borderColor: '#151515',
        borderRadius: 5,
        width: '90%',
        marginTop: 24,
        height: 24,
        paddingVertical: 20,
        paddingHorizontal: 5,
        multiline: true,
        numberOfLines: 4
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