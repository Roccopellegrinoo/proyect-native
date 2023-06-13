import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import FormRegister from '../components/FormRegister';

class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FormRegister navigation={this.props.navigation} />
        <Text style={styles.text}>
          ¿Ya tienes una cuenta?<Text> </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.btnText}>Ingresa aquí</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34044C',
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  btnText: {
    textAlign: 'center',
    color: '#FECB2E',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 5,
    fontSize: 16,
    lineHeight: 24,
  },
});