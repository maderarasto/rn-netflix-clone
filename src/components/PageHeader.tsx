import { View, Text, StyleSheet, ViewStyle, RegisteredStyle, StyleProp } from 'react-native'
import React from 'react'

type HeaderOptions = {
  headerStyle?: StyleProp<ViewStyle>
  headerTitle?: () => React.JSX.Element
  headerRight?: () => React.JSX.Element
  headerLeft?: () => React.JSX.Element
}

type PageHeaderParams = {
  options?: HeaderOptions
}

const PageHeader = ({
  options = {}
}: PageHeaderParams) => {
  function resolveHeaderStyle() {
    let style = {
      ...styles.headerContainer,
    }

    if (options.headerStyle) {
      style = {
        ...style,
        ...(options.headerStyle as object)
      }
    }

    return style;
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
      paddingHorizontal: 5,
      paddingVertical: 5,
      backgroundColor: 'transparent'
    }
})

export default PageHeader