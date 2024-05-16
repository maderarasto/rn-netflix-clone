import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

type RatingParams = {
    value: number
    max?: number
}

const Rating = ({
    value,
    max = 5,
}: RatingParams) => {
  function getSequence(count: number) {
    return [...Array(count).keys()];
  }

  function resolveIconColor(num: number) {
    return Math.round(value) - num > 0 ? '#ffff66' : 'gray';
  }

  return (
    <View style={styles.ratingContainer}>
      {getSequence(max).map((num) => (
        <FontAwesome key={`star-${num}`} name="star" size={12} color={resolveIconColor(num)} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 5
    }
})

export default Rating