import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';

export default class CamaraPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCamara: false,
      fotoTomada: '',
    };
    this.metodosCamara = null;
  }

  componentDidMount() {
    Camera.getCameraPermissionsAsync()
      .then(resp => this.setState({ mostrarCamara: true }))
      .catch(err => console.log(err));
  }

  tomarFoto() {
    this.metodosCamara
      .takePictureAsync()
      .then(fotoEnMemoria => {
        this.setState({
          fotoTomada: fotoEnMemoria.uri,
          mostrarCamara: false,
        });
      })
      .catch(err => console.log(err));
  }

  aceptarFoto() {
    fetch(this.state.fotoTomada)
      .then(resp => resp.blob())
      .then(imagen => {
        const ref = storage.ref(`fotos/${Date.now()}.jpg`);
        ref
          .put(imagen)
          .then(() => {
            ref.getDownloadURL().then(url => this.props.actualizarEstadoFoto(url));
          });
      })
      .catch(err => console.log(err));
  }

  rechazarFoto() {
    this.setState({
      mostrarCamara: true,
      fotoTomada: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.mostrarCamara && this.state.fotoTomada === '' ? 
          <>
            <Camera 
              style={styles.camera} 
              type={Camera.Constants.Type.front} 
              ref={ref => (this.metodosCamara = ref)} 
            />
            <TouchableOpacity style={styles.button} onPress={() => this.tomarFoto()}>
              <Text style={styles.buttonText}>Tomar foto</Text>
            </TouchableOpacity>
          </>
          : this.state.mostrarCamara === false && this.state.fotoTomada !== '' ? 
          <>
            <Image 
              source={{ uri: this.state.fotoTomada }} 
              style={styles.image} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => this.aceptarFoto()}>
                <Text style={styles.buttonText}>Aceptar foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton} onPress={() => this.rechazarFoto()}>
                <Text style={styles.buttonText}>Rechazar foto</Text>
              </TouchableOpacity>
            </View>
          </>
          : 
          <Text>No tiene permiso para usar la cámara</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: 600,
    width: 900,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#BC74B8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  acceptButton: {
    backgroundColor: '#BC74B8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  rejectButton: {
    backgroundColor: '#E57373',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});