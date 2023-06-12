import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { db } from '../firebase/config';
import Posteos from '../components/Posteos';

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: '',
            posts: []
        }
    }

    componentDidMount(){
        const busqueda = this.props.route.params.busqueda;

        db.collection('posts').onSnapshot( docs => {
            let arrDocs=[]

            docs.forEach(doc => {
                if (doc.data().descripcion.includes(busqueda)) {
                    arrDocs.push({
                        id: doc.id,
                        data:doc.data()
                    })
                }
            })

            this.setState({
                posts: arrDocs
            })
        })
    }

    render() {
        return (
            <View>
                {
                    this.state.posts.length > 0 ?
                    <Posteos
                        data={this.state.posts}
                        navigation={this.props.navigation}
                    /> :
                    <Text>No hay resultados para esta busqueda</Text>
                }
            </View>
        )
    }

}

export default Buscador;

const styles = StyleSheet.create({

})