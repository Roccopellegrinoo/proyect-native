import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Post from './Post'

export default function Posteos(props) {
  return (
    <View style={styles.contenedor}>
      <FlatList 
        data={props.data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({ item }) => <Post navigation={props.navigation} data={ item } /> }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})