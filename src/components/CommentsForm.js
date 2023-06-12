import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
import Comentario from '../components/Comentario'

export default class CommentsForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario:'',
            data:{}
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

    componentDidMount(){
        db.collection('posts')
        .doc(this.props.idPost)
        .onSnapshot(doc => {
            this.setState({
                data:doc.data()
            }, ()=> console.log(this.state.data))
        })
    }

  render() {
    return (
        <View style={styles.contenedor}>
            {
                this.state.data.comments && this.state.data.comments.length > 0 ? 
                <>
                    <Text style={styles.title}>Comentarios</Text>
                    <FlatList
                        style={styles.flatList}
                        data={this.state.data.comments}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({item}) => <Comentario owner={item.owner} comentario={item.comentario} navigation={this.props.navigation}/>}
                        showsVerticalScrollIndicator={false}
                    />
                </> :
                <Text style={styles.title}>No hay comentarios</Text>
            }

            {/*  */}
            <TextInput
            keyboardType='default'
            style = {styles.input}
            onChangeText={text => this.setState({comentario: text})}
            value={this.state.comentario}
            placeholder='Crea tu comentario'
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> this.crearComentario(this.state.comentario)}
            >
                <Text style={styles.btnText}>Enviar comentario</Text>
            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    contenedor: {
        width: '30%',
        marginTop: 32,
        flex: 1,
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
        marginBottom: 10
    },
    flatList: {
        width: '100%',
    }
})