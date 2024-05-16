import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { Movie } from "@src/types";
import { ORIGIN } from "@src/config";
import Rating from "./Rating";
import MovieTag from "./MovieTag";
import MovieStat from "./MovieStat";
import { Entypo } from "@expo/vector-icons";
import { formatNumber } from "@src/utils";

type MovieSlideParams = {
  movie: Movie;
};

const SCROLL_VIEW_PADDING = 10;
const CONTAINER_GAP = 20;
const POSTER_WIDTH = 110;

const MovieSlide = ({ movie }: MovieSlideParams) => {
  return (
    <View style={styles.slideContainer}>
      <Image
        source={{ uri: `${ORIGIN}/assets/images/${movie.imagePath}` }}
        style={styles.posterImage}
      />
      <View style={{justifyContent: 'center' }}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Rating value={movie.rating / 2} />
          <Text style={{ fontSize: 10, color: 'gray' }}>
            {formatNumber(movie.reviews)} Reviews
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8, marginBottom: 10,}}>
            <MovieStat icon={<Entypo name="eye" size={14} color="gray" />} label={movie.views} />
            <MovieStat icon={<Entypo name="heart" size={14} color="gray" />} label={movie.likes} />
            <MovieStat icon={<Entypo name="arrow-down" size={14} color="gray" />} label={movie.downloads} />
        </View>

        <View style={{flexDirection: 'row'}}>
            <Text style={styles.movieDescription}>{movie.description}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 5}}>
          {movie.tags.map((tag) => (
            <MovieTag key={tag.toLowerCase()} text={tag} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flexDirection: 'row',
    gap: CONTAINER_GAP,
    // height: 175,
  },

  posterImage: {
    width: POSTER_WIDTH,
    height: 175,
    borderRadius: 10
  },

  movieTitle: {
    marginBottom: 5,
    fontSize: 16,
    color: 'white',
  },

  movieDescription: {
    width: Dimensions.get('window').width - SCROLL_VIEW_PADDING * 2 - CONTAINER_GAP - POSTER_WIDTH,
    marginBottom: 10,
    fontSize: 10,
    color: 'lightgray',
  }
});

export default MovieSlide;
