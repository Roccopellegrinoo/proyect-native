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
            inputContraseña: '',
        }
    }

    registrarUsuario(mail, contraseña){
        auth.createUserWithEmailAndPassword(mail, contraseña)
        .then( data => {
            this.props.navigation.navigate('HomeNav')
            db.collection('users').add({
                owner:auth.currentUser.email,
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
                <Text style={styles.title}>Regístrate</Text>
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
                    placeholder='Contraseña'
                    onChangeText={(text) => this.setState({ inputContraseña: text })}
                    value={this.state.inputContraseña}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputContraseña)}
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