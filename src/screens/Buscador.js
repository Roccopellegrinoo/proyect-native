import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from '../firebase/config';
//import Posteos from '../components/Posteos';

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: '',
            usuarios: [],
            usuariosBackup: []
        }
    }
      
    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                let arrUsers = []
                docs.forEach(doc => {
                    arrUsers.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    usuarios : arrUsers,
                    usuariosBackup : arrUsers
                
                })
        
            }
        )

    }

    Filtrado(loFiltrado){
    let arrFiltrado = this.state.usuarios
    .filter(usuario =>
        usuario.data.owner.toLowerCase().includes(loFiltrado.toLowerCase()))
        this.setState({usuarios:arrFiltrado})
    }
    render() {
        return (
            <View>
                
                   <Text>  Buscador </Text>
                   <TextInput
                     placeholder='ingresa tu mail'
                     onChangeText={(Text) => this.Filtrado(Text)}
                />
                <FlatList
                data={this.state.usuarios}
                keyExtractor={item => item.id.toString()}
                renderItem={({item})=><Text>{item.data.owner}</Text>}
                
                
                />
            </View>
        )
    }

}

export default Buscador;

const styles = StyleSheet.create({

})