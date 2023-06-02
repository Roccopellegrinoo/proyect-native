import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native-web';
import React, { Component } from 'react';
import { db } from '../firebase/config'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text>LOGO RED SOCIAL</Text>
                <div style={styles.buscador}> {/* Podría ser un componente directamente */}
                    <TextInput
                        style={styles.input}
                        placeholder='Buscar'
                    />
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text>Buscar</Text>
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
        padding: 25
    },
    buscador: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid gray',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderRightWidth: 1,
        paddingLeft: 10
    },
    button: {
        paddingHorizontal: 10
    }
});