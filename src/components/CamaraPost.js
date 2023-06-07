import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state ={
            mostrarCamara: false,
            fotoTomada: ''
        }
        this.metodosCamara.null
    }
    componentDidMount(){    
        Camera.getCameraPermissionsAsync()
        .then(resp => this.setState({mostrarCamara: true}))
        .catch(err => console.log(err))

    }

  render() {
    return (
      <View>
        <Camera
        style={styles.camara}
        type={Camera.Constants.Type.back}
        ref={(metodosCamara)=> this.metodosCamara = metodosComponente}

        
        
        
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
    camara :{

    }
})