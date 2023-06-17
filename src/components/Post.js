import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'


export default class Post extends Component {

  constructor(props){
    super(props)
    this.state={
      isLiked:false
    }
  }

  componentDidMount(){
    let estaMiLike = this.props.data.data.likes.includes(auth.currentUser.email)
    if(estaMiLike === true){
      this.setState({
        isLiked: true
      })
    }
  }


  like(){
    db.collection('posts')
    .doc(this.props.data.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then((resp) =>{
      this.setState({
        isLiked:true
      })
    })
    .catch(err => console.log(err))

  }

  unlike(){
    db.collection('posts').doc(this.props.data.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then((resp) => this.setState({
      isLiked:false
    }))
    .catch(err => console.log(err))

    
  }

  render() {
    return (
      <View style={styles.contenedor}>
        <div style={styles.headerDiv}>
          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('ProfileAmigo', {email: this.props.data.data.owner})}
          >
            <Text style={styles.nombreUsuario}>{this.props.data.data.owner}</Text>
          </TouchableOpacity>
        </div>
        <div style={styles.bodyDiv}>
          <Image
            source={{uri: this.props.data.data.foto}}
            style={{width: 300, height: 300}}
          />
        </div>
        <div style={styles.footerDiv}>
          <Text>{this.props.data.data.descripcion}</Text>
          <View style={styles.contenedor_botones}>
            {
              this.state.isLiked ?
              <TouchableOpacity
              onPress={()=> this.unlike()}
              >
                <FontAwesome
                name='heart'
                size={24}
                color='red'
                />
              </TouchableOpacity>
              :
              <TouchableOpacity
              onPress={()=> this.like()}
              >
                <FontAwesome
                name='heart-o'
                size={24}
                color='red'
                />
              </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={()=> this.props.navigation.navigate('Comments', {id: this.props.data.id})}
              style={styles.botonComentar}
            >
              <Text style={styles.botonComentarTexto}>Agregar comentario</Text>
            </TouchableOpacity>
          </View>
        </div>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contenedor: {
    display: 'flex',
    alignContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  imagen: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  headerDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  bodyDiv: {
    backgroundColor: '#74549B'
  },
  footerDiv: {
    marginTop: 10,
  },
  nombreUsuario: {
    fontWeight: 'bold',
    color: '#3e3e3e'
  },
  contenedor_botones: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-start',
    alignItems: 'center',
    marginTop: 10,
  },
  botonComentar: {
    marginLeft: 15,
  },
  botonComentarTexto: {
    fontWeight: 'bold',
  }
})
