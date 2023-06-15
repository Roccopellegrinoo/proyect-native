import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class ProfileData extends Component {

  logout() {
    auth
      .signOut()
      .then(resp => this.props.navigation.navigate('Login'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={styles.profilePicture}
          />
          <View style={styles.profileInfoContainer}>
            <Text style={styles.emailText}>{auth.currentUser.email}</Text>
            <TouchableOpacity onPress={() => this.logout()} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.descriptionText}>Esta es la mini descripción del usuario.</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{this.props.lenPosteos}</Text>
            <Text style={styles.statLabel}>Publicaciones</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>256</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: 100,
    paddingBottom: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
  },
  profileInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#BC74B8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BC74B8',
  },
  statLabel: {
    fontSize: 12,
    color: '#555555',
    marginTop: 5,
  },
});
