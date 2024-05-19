import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, FlatList, GestureResponderEvent, Dimensions } from 'react-native'
import React, { RefObject, forwardRef, useImperativeHandle, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Movie } from '@src/types'
import { resolveImagePath } from '@src/utils'

type MovieGalleryParams = {
    movie: Movie,
    ref?: RefObject<Function>
}

export type MovieGalleryMethods = {
  openGallery: (screenshotIndex: number) => void
}

const MovieGallery = forwardRef<MovieGalleryMethods, MovieGalleryParams>(({
  movie
}: MovieGalleryParams, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchX, setTouchX] = useState(0);
  const [shown, setShown] = useState(false);

  useImperativeHandle(ref, () => ({
    openGallery: (screenshotIndex: number) => {
      setCurrentIndex(screenshotIndex);
      setShown(true);
    }
  }))
  
  function resolveContainerStyle() {
    const style = {
      ...styles.previewBackdrop
    };
    
    if (shown) {
      style.transform = [
        { translateY: 0 }
      ]
    }
    
    return style;
  }

  function resolveImageStyle(imageIndex: number) {
    const style = {
      ...styles.imageMiniature
    };
    
    if (currentIndex === imageIndex) {
      style.opacity = 1;
    }
    
    return style;
  }

  function changeCurrentIndex(imageIndex: number) {
    setCurrentIndex(imageIndex);
  }

  function onBackdropPress() {
    console.log('backdrop');
  }

  function onContainerTouchStart(ev: GestureResponderEvent) {
    setTouchX(ev.nativeEvent.pageX);
  }

  function onContainerTouchEnd(ev: GestureResponderEvent) {
    const touchDiffX = touchX - ev.nativeEvent.pageX;
    
    if (Math.abs(touchDiffX) < 30) {
      return;
    }
      
    setCurrentIndex((oldIndex) => {
      let newIndex = oldIndex;
      const lastIndex = movie?.screenshots.length - 1 ?? -1;
      const direction = Math.sign(touchDiffX);
      
      if (lastIndex < 0) {
        return oldIndex;
      }
      
      if (direction > 0 && oldIndex < lastIndex) {
        newIndex += 1;
      } else if (direction < 0 && oldIndex > 0) {
        newIndex -= 1;
      }
      console.log(newIndex);
      return newIndex;
    })
  }

  function onClosePress() {
    setShown(false);
  }

  function onPreviewBarPress(ev: GestureResponderEvent) {
    ev.preventDefault();
  }

  return (
    <Pressable 
      style={resolveContainerStyle()} 
      onPress={onBackdropPress} 
      onTouchStart={onContainerTouchStart}
      onTouchEnd={onContainerTouchEnd}
    >
      <TouchableOpacity style={styles.buttonClose} onPress={onClosePress}>
        <AntDesign name="close" size={24} color="white" />
      </TouchableOpacity>
      <View>
        <Image source={{ uri: resolveImagePath(movie?.screenshots.at(currentIndex) ?? '')}} style={styles.preview} />
      </View>
      <Pressable style={styles.previewBar} onPress={onPreviewBarPress}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 10, }}>
          <Image source={{ uri: resolveImagePath(movie?.imagePath)}} style={styles.posterMiniature} />
          <View>
            <Text style={styles.movieTitle}>{movie?.title}</Text>
            <Text style={styles.movieTags}>
              {movie?.tags.map((tagName, index, tags) => {
                return tagName + (index < (tags.length - 1) ? ' | ' : '')
              })}
            </Text>
          </View>
        </View>
        <FlatList data={movie?.screenshots}
          renderItem={(item) => (
            <TouchableOpacity onPress={() => changeCurrentIndex(item.index)}>
              <Image source={{ uri: resolveImagePath(item.item)}} style={resolveImageStyle(item.index)} />
            </TouchableOpacity>
          )} horizontal contentContainerStyle={{ columnGap: 5, }} />
      </Pressable>
    </Pressable>
  )
});

const screenDimensions = Dimensions.get('screen');
const styles = StyleSheet.create({
    previewBackdrop: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      transform: [
        { translateY: screenDimensions.height }
      ],
      zIndex: 2,
    },

    buttonClose: {
      position: 'absolute',
      top: 30,
      right: 0,
      zIndex: 20,
    },

    preview: {
      width: '100%',
      height: 'auto',
      resizeMode: 'contain',
      borderRadius: 10,
      aspectRatio: 1,
    },

    previewBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 10,
    },

    posterMiniature: {
      width: 25,
      height: 30,
    },

    movieTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 18,
      color: 'white'
    },

    movieTags: {
      fontSize: 12,
      lineHeight: 12,
      color: '#ccc',
    },

    imageMiniature: {
      width: 80,
      height: 40,
      opacity: 0.5
    }
})

export default MovieGallery