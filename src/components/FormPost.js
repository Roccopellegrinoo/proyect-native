import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class FormPost extends Component {
    constructor(props){
        super(props)
    }
  
    render() {
        return (
        <View >
             <View style={styles.contenedorCamara}> {/* CONTENEDOR CAMARA */}
                
            </View>
            <TextInput
            style={styles.input}
            keyboardType='default'
            value={this.props.stateDescripcion}
            placeholder='Ingresa la descripcion de tu post'
            onChangeText={ (text) => this.props.actualizarDescripcion(text) }
            multiline={true}
            rows={5}  
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedorCamara: {
        width: 400,
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3',
    },
    input: {
        borderWidth:1,
        borderColor: 'red',
        padding:10
    }
})