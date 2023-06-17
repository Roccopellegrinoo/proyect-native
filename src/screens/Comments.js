import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import CommentsForm from '../components/CommentsForm'
import { db } from '../firebase/config'

export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
        componentDidMount(){
            db.collection('posts')
            .doc(this.props.route.params.id)
            .onSnapshot(doc => {
                this.setState({
                    data:doc.data()
                }, ()=> console.log(this.state.data))
            })
        }
    
  render() {
    return (
        <View style={styles.contenedor}>
            <Text>Comentarios</Text>
            <FlatList
            data={this.state.data.Comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={(item) => <Text>{item.comentario} </Text>}
            
            
            />
            <CommentsForm idPost={this.props.route.params.id} />
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