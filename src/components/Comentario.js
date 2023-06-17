import React, { Component } from 'react';
import  { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

class Comentario extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render () {
        return (
            <View style={styles.contenedor}>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('ProfileAmigo', { owner: this.props.owner })}
                >
                    <Text style={styles.owner}>{this.props.owner}</Text>
                </TouchableOpacity>
                <Text style={styles.separador}>:</Text>
                <Text style={styles.comentario}>{this.props.comentario}</Text>
            </View>
        )
    }
}

export default Comentario;

const styles = StyleSheet.create({
    contenedor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 'auto',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 5,
        width: '90%',
    },
    owner: {
        fontWeight: 'bold',
    },
    separador: {
        marginLeft: 5,
        marginRight: 10,
    },
    comentario: {
        flex: 1,
    }
})