import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type MovieStatParams = {
    icon: React.JSX.Element
    label: string
}

const MovieStat = ({
    icon,
    label
}: MovieStatParams) => {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },

    label: {
        fontSize: 10,
        color: 'gray',
    }
})

export default MovieStat