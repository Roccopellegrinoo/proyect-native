import { View, Text, FlatList, Image, StyleSheet  } from 'react-native'
import React, {Component} from 'react'
import ProfileData from '../components/ProfileData'
import Header from '../components/Header'
import Post from '../components/Post'
import {db, auth} from '../firebase/config'

class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
      posteos: [],
      lenPosteos: 0,
      usuarios: [],
      loading: true
    }
  }

  componentDidMount(){
    db.collection('users').onSnapshot(
      docs => {
        let arrayPosteos = [];

        docs.forEach(doc => {
          if (doc.data().owner == auth.currentUser.email) {
            arrayPosteos.push({
              id: doc.id,
              data: doc.data()
            })
          }
        })
        
        this.setState({
          posteos: arrayPosteos,
          loading: false
        })
      }
    )
  }

  calcularLenPosteos(){
    return this.state.posteos.length;
  }


  render(){
    return (
      <View style={styles.contenedor}>
      <Header navigation={this.props.navigation} />
      <ProfileData navigation={this.props.navigation} lenPosteos={this.calcularLenPosteos()} style={styles.profileData}/> 
      {
        this.state.posteos.length > 0 ?
        <FlatList
          data={this.state.posteos}
          keyExtractor={ (item) => item.id.toString()}
          renderItem={({item}) => <Post data={item} navigation={this.props.navigation} />}
        /> :
        <Text>No hay posteos</Text>
      }
    </View>
    )
  }
}

export default Profile

const styles = StyleSheet.create({
  contenedor: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  profileData: {
    margin: 5
  }
})