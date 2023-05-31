import React, {Component} from 'react'
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native'

const arrayDeDatos = [
    {
        id:1,
        nombre: 'Pepe',
        img: 'https://thumbs.dreamstime.com/b/sentada-del-perrito-de-labrador-30817211.jpg'
    },
    {
        id:2,
        nombre: 'Pepe2',
        img: 'https://thumbs.dreamstime.com/b/sentada-del-perrito-de-labrador-30817211.jpg'
    },
    {
        id:3,
        nombre: 'Pepe3',
        img: 'https://thumbs.dreamstime.com/b/sentada-del-perrito-de-labrador-30817211.jpg'
    },
]

class Home extends Component{
    constructor(props){
        super(props)
    }

    ejecutarConAccionCorta(){
        console.log('El cliente nos pidio algo')
    }

    ejecutarConAccionLarga(){
        console.log('El cliente nos pidio algo')
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
                    <Text> Mandame al registro por favor</Text>
                </TouchableOpacity>
                <Text>
                    Aqui vamos a crear una Home copada
                </Text>
                <TouchableOpacity
                style={styles.button}
                onPress={()=> this.ejecutarConAccionCorta()}
                onLongPress={()=> this.ejecutarConAccionLarga()}
                >
                    <Text style={styles.textoBtn}>
                        Algun día sere Boton
                    </Text>
                </TouchableOpacity>
                <ActivityIndicator
                    size={45}
                    color='#c3c3c3'
                />
                <Image
                    source={{uri: 'https://thumbs.dreamstime.com/b/sentada-del-perrito-de-labrador-30817211.jpg'}}
                    style={styles.img}
                    resizeMode='contain'
                />

                <FlatList
                    data={arrayDeDatos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                    <View>
                        <Text>{item.nombre}</Text>                        <Image
                        source={{uri: item.img}}
                        style={styles.img}
                        resizeMode='contain'
                        />
                    </View>  
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'green',
        borderRadius: 20,
        borderWidth:2,
        textAlign:'center',
        padding:10
    },
    textoBtn:{
        color:'white'
    },
    img: {
        height:350
    }
   
})

export default Home