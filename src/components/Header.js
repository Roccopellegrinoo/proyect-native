import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native-web';
import React, { Component } from 'react';
import { db } from '../firebase/config';
import { Ionicons } from '@expo/vector-icons';

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: ''
        }
    }

    enviarBusqueda() {
        if (this.state.busqueda.length > 0) {
            this.props.navigation.navigate('Buscador', { busqueda: this.state.busqueda })
        } else {
            console.log('No hay busqueda')
        }
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.logo}>LOGO RED SOCIAL</Text>
                <View style={styles.buscador}>
                    <TextInput
                        onChangeText={(text) => {this.setState({busqueda: text})}}
                        style={styles.input}
                        placeholder='Buscar'
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.enviarBusqueda()}
                    >
                        <Ionicons name='md-search' color='#34044C' size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

export default Header;

const styles = StyleSheet.create({
    contenedor: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#bc74b8'
    },
    buscador: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bc74b8',
        borderRadius: 10,
        marginLeft: 10
    },
    input: {
        height: 40,
        width: 200,
        paddingLeft: 10
    },
    button: {
        paddingHorizontal: 10
    }
});