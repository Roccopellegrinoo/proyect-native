import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import FormLogin from '../components/FormLogin';
import { auth } from '../firebase/config';

class Login extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeNav');
      }
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FormLogin navigation={this.props.navigation} />
        <Text style={styles.text}>
          ¿Aún no tienes una cuenta?<Text> </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text style={styles.btnText}>Regístrate aquí</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34044c',
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