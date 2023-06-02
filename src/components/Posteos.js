import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Post from './Post'

export default function Posteos(props) {
  return (
    <View style={styles.contenedor}>
      <FlatList 
        // NO SCROLLEA *********************************************************
        data={props.data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({ item }) => <Post data={ item } /> }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})