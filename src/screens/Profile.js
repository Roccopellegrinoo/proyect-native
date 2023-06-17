import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import ProfileData from '../components/ProfileData';
import Header from '../components/Header';
import { db, auth } from '../firebase/config';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot(docs => {
      let arrUsuarios = [];

      docs.forEach(doc =>
        arrUsuarios.push({
          id: doc.id,
          data: doc.data(),
        })
      );

      this.setState({
        usuarios: arrUsuarios,
        loading: false,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <View style={styles.profileContainer}>
          <ProfileData navigation={this.props.navigation} />
          <View style={styles.postsContainer}>
            <FlatList
              data={this.state.usuarios}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item.data.photo }} style={styles.postImage} />
              )}
              numColumns={3}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFF',
  },
  postsContainer: {
    marginTop: 20,
  },
  postsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  postImage: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
});

export default Profile;