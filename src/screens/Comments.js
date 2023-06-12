import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import CommentsForm from '../components/CommentsForm'
import { db } from '../firebase/config'

export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
  render() {
    return (
        <View style={styles.contenedor}>
            <CommentsForm idPost={this.props.route.params.id} navigation={this.props.navigation} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#74549B',
        height: '100vh'
    },
})