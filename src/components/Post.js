import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false
    };
  }

  componentDidMount() {
    let estaMiLike = this.props.data.data.likes.includes(auth.currentUser.email);
    if (estaMiLike === true) {
      this.setState({
        isLiked: true
      });
    }
  }

  like() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(resp => {
        this.setState({
          isLiked: true
        });
      })
      .catch(err => console.log(err));
  }

  unlike() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(resp =>
        this.setState({
          isLiked: false
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile', { email: this.props.data.data.owner })}
        >
          <Text style={styles.username}>{this.props.data.data.owner}</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={{ uri: this.props.data.data.foto }} style={styles.image} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.description}>{this.props.data.data.descripcion}</Text>
          {this.state.isLiked ? (
            <TouchableOpacity onPress={() => this.unlike()} style={styles.iconContainer}>
              <FontAwesome name="heart" size={24} color="#34044C" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.like()} style={styles.iconContainer}>
              <FontAwesome name="heart-o" size={24} color="#34044C" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#34044C',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 4
  },
  imageContainer: {
    backgroundColor: '#bc74b8',
    marginVertical: 10
  },
  image: {
    width: '100%',
    height: 300,
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  username: {
    fontWeight: 'bold',
    color: '#3e3e3e',
    marginTop: 10,
    marginLeft: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  description: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    color: '#555555'
  },
  iconContainer: {
    marginLeft: 10
  }
});


