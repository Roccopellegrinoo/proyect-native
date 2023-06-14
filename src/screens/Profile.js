import { View, Text, FlatList, Image, StyleSheet  } from 'react-native'
import React, {Component} from 'react'
import ProfileData from '../components/ProfileData'
import Header from '../components/Header'
import {db, auth} from '../firebase/config'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuarios: [],
      loading: true
    }
  }

  componentDidMount(){
    db.collection('users').onSnapshot(
      docs => {
        let arrUsuarios = []

        docs.forEach(doc => arrUsuarios.push({
          id: doc.id,
          data: doc.data()
        }))

        this.setState({
          usuarios: arrUsuarios,
          loading:false
        })
      }
    )
  }

  render(){
    return (
      <View>
         <View style={styles.header}>
          <Header navigation={this.props.navigation}/>
        </View>
        <Text>Perfil</Text>
        <ProfileData navigation={this.props.navigation} />
        <FlatList
          data={this.state.usuarios}
          keyExtractor={ (item) => item.id.toString()}
          renderItem={({item}) => <Text>{item.data.owner}</Text>}
        />
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