import React, { Component } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import ProfileData from "../components/ProfileData";

import Header from "../components/Header";
import Posteos from "../components/Posteos";
import { db, auth } from "../firebase/config";

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
        }
    }

    componentDidMount() {
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
            let arrPost = []

            docs.forEach(doc => arrPost.push({
                id: doc.id,
                data: doc.data()
            }))
            this.setState({
                posteos : arrPost
            })
        })
    }

    logout() {
        auth
            .signOut()
            .then(resp => this.props.navigation.navigate('Login'))
            .catch(err => console.log(err));
    }

    render() {
        return(
            <View
                style={styles.contenedor}
            >
                <Header />
                <View style={styles.perfil}>
                    <ProfileData emailUsuario={auth.currentUser.email} lenPosteos={this.state.posteos.length} navigation={this.props.navigation}/>
                </View>
                <View style={styles.datos}>
                    <Posteos data={this.state.posteos} navigation={this.props.navigation} />
                </View>
            </View>
        )
    };

}

export default MiPerfil;

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    perfil: {
        flex: 1,
    },
    datos: {
        flex: 1,
    },
    imagen: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
})