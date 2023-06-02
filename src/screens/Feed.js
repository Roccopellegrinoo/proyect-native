import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Posteos from '../components/Posteos'
import Header from '../components/Header'

export default class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot( docs => {
            let arrDocs=[]

            docs.forEach(doc => arrDocs.push({
                id: doc.id,
                data:doc.data()
            }))
            console.log(arrDocs)

            this.setState({
                posts: arrDocs
            })
        })
    }
  render() {
    return (
      <View>
        <div style={styles.header}>
          <Header />
        </div>
        <Posteos
            data={this.state.posts}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})