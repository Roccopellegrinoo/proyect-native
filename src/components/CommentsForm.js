import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
import Comentario from '../components/Comentario'

export default class CommentsForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario:''
            
        }
    }

    crearComentario(comentario){
        db.collection('posts')
        .doc(this.props.idPost)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: comentario
            })
        })
    }

    

    render() {
        return (
          <View>
            <TextInput
            keyboardType='default'
            style = {styles.input}
            onChangeText={text => this.setState({comentario: text})}
            value={this.state.comentario}
            placeholder='Crea tu comentario'
            />
            <TouchableOpacity
            onPress={()=> this.crearComentario(this.state.comentario)}
            >
                <Text>Enviar comentario</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }

const styles = StyleSheet.create({

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
        marginBottom: 10
    },
    flatList: {
        width: '100%',
    }
})