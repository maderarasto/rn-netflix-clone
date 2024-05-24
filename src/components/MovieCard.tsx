import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Movie } from "@src/types";
import { ORIGIN } from "@src/config";
import Rating from "./Rating";
import { formatNumber } from "@src/utils";
import { useRouter } from "expo-router";

type MovieCardParams = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardParams) => {
  const router = useRouter();

  function onCardPress() {
    router.push(`/${movie.id}`);
  }

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onCardPress}>
      <Image
        source={{ uri: `${ORIGIN}/assets/images/${movie.imagePath}` }}
        style={styles.posterImage}
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {movie.title}
      </Text>
      <Text style={styles.movieGenre}>
        {movie.tags[0]}
      </Text>
      <Rating value={movie.rating / 2} />
      <Text style={{ fontSize: 10, color: "gray" }}>
        {formatNumber(movie.reviews)} Reviews
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 100
  },

  posterImage: {
    height: 150,
    marginBottom: 10,
    borderRadius: 10
  },

  movieTitle: {
    marginBottom: -2,
    fontWeight: "bold",
    color: "white"
  },

  movieGenre: {
    marginBottom: 5,
    fontSize: 11,
    color: "red"
  }
});

export default MovieCard;
