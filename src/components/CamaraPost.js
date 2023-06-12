import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

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
      this.setState(
        {
        fotoTomada: fotoEnMemoria.uri,
        mostrarCamara: false
      })

    })
    .catch(err => console.log(err))
  }
  aceptarFoto(){
    fetch(this.state.fotoTomada)
    .then(resp => resp.blob())
    .then(imagen => {
        const ref = storage.ref(`fotos/${Date.now()}.jpg`)
        ref.put(imagen)
        .then(()=>{
            ref.getDownloadURL()
            .then((url)=> this.props.actualizarEstadoFoto(url))
        })

    })
    .catch(err => console.log(err))
}

rechazarFoto(){
    this.setState({
        mostrarCamara: true,
        fotoTomada:''
    })
}





  render() {
    return (
      <View style={styles.contenedor}>
        {
          this.state.mostrarCamara && this.state.fotoTomada === '' ?
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
            : this.state.mostrarCamara === false && this.state.fotoTomada !== '' ?
            <>
                    <Image
                        source={{uri: this.state.fotoTomada}}
                        style={styles.imagen}
                    />
                    <View>
                        <TouchableOpacity
                        onPress={()=> this.aceptarFoto()}
                        >
                            <Text>
                                Aceptar foto
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> this.rechazarFoto()}
                        >
                            <Text>
                                Rechazar foto
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    height: 200,
    width: 200
  },
  imagen:{
    height: 200,
    width: 200
  }
})