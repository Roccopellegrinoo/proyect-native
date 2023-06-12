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
                <Text>LOGO RED SOCIAL</Text>
                <div style={styles.buscador}> {/* Podría ser un componente directamente */}
                    <TextInput
                        onChangeText={(text) => {this.setState({busqueda: text})}}
                        style={styles.input}
                        placeholder = 'Buscar'
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.enviarBusqueda()}
                    >
                        <Text>
                            <Ionicons name='md-search' color='#74549B' size ={24} />
                        </Text>
                    </TouchableOpacity>
                </div>
            </View>
        )
    }
};

export default Header;

const styles = StyleSheet.create({
    contenedor: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
    },
    buscador: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid gray',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 10,
    },
    input: {
        height: 40,
        width: 200,
        borderRightWidth: 1,
        borderColor: '#e3e3e3',
        paddingLeft: 10
    },
    button: {
        paddingHorizontal: 10
    }
});