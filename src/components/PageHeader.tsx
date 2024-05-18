import { View, Text, StyleSheet, ViewStyle, RegisteredStyle } from 'react-native'
import React from 'react'

type HeaderOptions = {
  height?: number,
  headerTitle?: () => React.JSX.Element
  headerRight?: () => React.JSX.Element
  headerLeft?: () => React.JSX.Element
}

type PageHeaderParams = {
  options?: HeaderOptions
}

const HEADER_HEIGHT_DEFAULT = 55;

const PageHeader = ({
  options = {}
}: PageHeaderParams) => {
  function resolveHeaderStyle() {
    return {
      ...styles.headerContainer,
      height: options.height ?? HEADER_HEIGHT_DEFAULT
    }
  }
  return (
    <View style={resolveHeaderStyle()}>
      <View>
        {options.headerLeft ? options.headerLeft() : ''}
      </View>
      <View>
        {options.headerTitle ? options.headerTitle() : ''}
      </View>
      <View>
        {options.headerRight ? options.headerRight() : ''}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: 'transparent'
    }
})

export default PageHeader