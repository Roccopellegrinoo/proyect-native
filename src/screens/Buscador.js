import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from '../firebase/config';
//import Posteos from '../components/Posteos';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      usuarios: [],
      usuariosBackup: [],
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot(
        docs => {
            let arrUsers = [];
            docs.forEach(doc => {
                arrUsers.push({
                    id: doc.id,
                    data: doc.data(),
                });
        });

            this.setState({
                usuarios: arrUsers,
                usuariosBackup: arrUsers,
        });
    });
  }

  Filtrado(loFiltrado) {
    let arrFiltrado = this.state.usuarios
    .filter(usuario =>
        usuario.data.owner.toLowerCase().includes(loFiltrado.toLowerCase())
    );
    this.setState({ usuarios: arrFiltrado });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscador</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo electrónico"
            placeholderTextColor="#BC74B8"
            onChangeText={text => this.Filtrado(text)}
          />
        </View>
        <FlatList
          data={this.state.usuarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.userText}>{item.data.owner}</Text>}
        />
      </View>
    );
  }
}

export default Buscador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#BC74B8',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    color: '#BC74B8',
  },
  userText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
});