import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import Header from '../components/Header'
import { db, auth } from '../firebase/config'
import CamaraPost from '../components/CamaraPost'

class NewPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            urlImagen: '',
            descripcion: '',
            likes: [],
            comentarios: [],
        }
    }

    crearPosteo({descripcion, foto, likes, comments}){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            descripcion: descripcion,
            foto: foto,
            likes: likes,
            comments: comments,
            createdAt: Date.now(),
        })
        .then((resp)=>{
            this.props.navigation.navigate('Feed')
        })
        .catch(err => console.log(err))
    }

    validarComentario(comentario) {
        return comentario.length > 0
    }

    actualizarDescripcion(text){
        this.setState({
            descripcion: text
        })
    }

    actualizarEstadoFoto(foto){
        this.setState ({
            urlImagen: foto
        })

    }

    onImagePicked(image) {
        const imageUri = image.uri
        this.setState({
            urlImagen: imageUri,
            mostrarCamara: false
        })
    }

    render() {
        return (
            
        <View style={styles.contenedor}>
            <div style={styles.header}>
                <Header />
            </div>
            {
                this.state.urlImagen === "" ?
               <CamaraPost
               actualizarEstadoFoto={
                (foto)=>this.actualizarEstadoFoto(foto)
               }
               
               />
               : 
           <>
            <FormPost stateDescripcion={this.state.descripcion} actualizarDescripcion={(text) => this.actualizarDescripcion(text) } />
            
                <TouchableOpacity
                    onPress={()=> this.crearPosteo({
                        descripcion:this.state.descripcion,
                        foto:this.state.foto,
                        likes: this.state.likes,
                        comments:this.state.comments
                    })}
                >
                    <Text>Enviar el posteo</Text>
                </TouchableOpacity>
                    </>
                 }
            </View>
        
        )
    }
}

export default NewPosts

const styles = StyleSheet.create({
    contenedor: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contenedorBtn: {
        
    }
})