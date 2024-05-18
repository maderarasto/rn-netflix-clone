import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type MovieDetailParams = {
  label: string
  value: string|number
}

const MovieDetail = ({
  label,
  value
}: MovieDetailParams) => {
  return (
    <View style={{ width: 100, }}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailLabel: {
    marginBottom: 3,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray'
  },

  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default MovieDetail