import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class ProfileData extends Component {

    logout(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate('Login'))
        .catch(err => console.log(err))
    }
    render() {
      return (
        <View style={styles.contenedor}>
          <div style={{ display: 'flex', flexDirection: 'row' }}> {/* Contenedor datos perfil */}
            <div style={{ borderRadius: '50%' }}> {/* Contenedor datos foto perfil */}
              <Image
                source={{ uri: 'https://picsum.photos/200/300' }}
                style={{ width: 150, height: 150, borderRadius: 100 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 50, justifyContent: 'center' }}> {/* Contenedor información del perfil */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 15, textTransform: 'capitalize' }}>{auth.currentUser.email}</Text>
                <TouchableOpacity onPress={() => this.logout()} style={styles.btn} ><Text style={styles.btnText}>Cerrar sesión</Text></TouchableOpacity>
              </div>
              <Text style={{ fontSize: 16, paddingBottom: 5 }}>{this.props.lenPosteos} posts</Text> {/* cantidad de posteos */}
              <Text style={{ fontSize: 16 }}>Esta es la mini descripción del usuario.</Text> {/* mini descripción del usuario */}
            </div>
          </div>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    // marginTop: 32,
    backgroundColor: '#74549B',
    padding: 5,
    borderRadius: 20,
    // margin: 5,
  },
  btnText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  contenedor: {
    margin: 10,
  }
})