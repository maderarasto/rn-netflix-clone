import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

type FilterItem = {
  key: string
  name: string
}

type FilterParams = {
  activeFilter?: string,
  onItemClick?: (filterKey: string) => void
}

const Filter = ({
  activeFilter,
  onItemClick
}: FilterParams) => {
  const [filterItems, setFilterItems] = useState<FilterItem[]>([
    { key: 'trending', name: 'Trending' },
    { key: 'movies', name: 'Movies' },
    { key: 'originals', name: 'Originals' },
    { key: 'kids', name: 'Kids' },
  ]);

  function getFilterItemStyle(filterItem: FilterItem) {
    return {
      ...styles.filterLabel,
      fontSize: filterItem.key === resolveActiveFilter() ? 18 : 14,
      color: filterItem.key === resolveActiveFilter() ? 'white' : 'gray'
    }
  }

  function resolveActiveFilter() {
    let result = activeFilter;

    if (!filterItems.length) {
      return '';
    }

    if (!result) {
      result = filterItems[0].key;
    }

    return result;
  }

  function onFilterItemClick(filterItem: FilterItem) {
    if (!onItemClick) {
      return;
    }

    onItemClick(filterItem.key)
  }

  return (
    <View style={styles.filterContainer}>
      <ScrollView 
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scrollContainer} 
        bounces={false} 
        alwaysBounceHorizontal={false} 
        horizontal
      >
        {filterItems.map((filterItem) => (
          <TouchableOpacity key={filterItem.key} onPress={() => onFilterItemClick(filterItem)}>
            <Text style={getFilterItemStyle(filterItem)} >
              {filterItem.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    filterContainer: {        
        justifyContent: 'center',
        height: 50,
        marginBottom: 10,
    },

    scrollContainer: {
        marginTop: 10,
    },

    scrollContentContainer: {
      alignItems: 'center',
      gap: 50,
    },

    filterLabel: {
    }
})

export default Filter