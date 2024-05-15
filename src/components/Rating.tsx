import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

type RatingParams = {
    value: number
    max?: number
    reviewCount?: number
}

const Rating = ({
    value,
    max = 5,
    reviewCount = 0
}: RatingParams) => {
  function getSequence(count: number) {
    return [...Array(count).keys()];
  }

  function resolveIconColor(num: number) {
    return Math.round(value) - num > 0 ? '#ffff66' : 'gray';
  }

  function resolveNumberFormatting(num: number) {
    const formatter = new Intl.NumberFormat('en');
    return formatter.format(num);
  }

  return (
    <View style={styles.ratingContainer}>
      <View style={{flexDirection: 'row', gap: 4,}}>
        {getSequence(max).map((num) => (
            <FontAwesome key={`star-${num}`} name="star" size={12} color={resolveIconColor(num)} />
        ))}
      </View>
      <Text style={styles.reviewLabel}>{resolveNumberFormatting(reviewCount)} Reviews</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 5
    },

    reviewLabel: {
        fontSize: 12,
        color: 'gray',
    }
})

export default Rating