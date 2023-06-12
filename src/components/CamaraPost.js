import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'

export default class CamaraPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mostrarCamara: false,
      fotoTomada: ''
    }
    this.metodosCamara = null

  }
  componentDidMount() {
    Camera.getCameraPermissionsAsync()
      .then(resp => this.setState({ mostrarCamara: true }))
      .catch(err => console.log(err))

  }

  tomarFoto() {
    this.metodosCamara.takePictureAsync()
    .then(fotoEnMemoria => {
      this.setState({
        fotoTomada: fotoEnMemoria.uri
      })

    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.contenedor}>
        {
          this.state.mostrarCamara ?
            <>
              <Camera
                style={styles.camara}
                type={Camera.Constants.Type.front}
                ref={(metodosComponente) => this.metodosCamara = metodosComponente}
              />
              <TouchableOpacity
              onPress={() => this.tomarFoto()}
              >
                <Text>
                  Tomar foto
                </Text>
              </TouchableOpacity>
            </>
            :
            <Text>No tiene permiso para usar la camara</Text>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1
  },
  camara: {
    height: 250
  }
})