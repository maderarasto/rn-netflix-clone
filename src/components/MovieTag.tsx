import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type MovieTagParams = {
    text: string
}

const MovieTag = ({
    text
}: MovieTagParams) => {
  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    tagContainer: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: '#C59B19',
        borderRadius: 4,
    },

    tagText: {
        fontSize: 10,
        color: '#C59B19'
    }
})

export default MovieTag