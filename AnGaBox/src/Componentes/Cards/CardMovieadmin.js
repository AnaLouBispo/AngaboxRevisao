import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function CardMovieAdmin() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // Função para buscar os filmes da API
  const listMovies = async () => {
    try {
      const response = await axios.get('http://192.168.1.2:8080/api/movie');
      setMovies(response.data.movies);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error.message);
      setLoading(false);
    }
  };

  // Função para deletar um filme
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.2:8080/api/movie/${id}`);
      Alert.alert('Filme deletado com sucesso!');
      listMovies(); // Atualiza a lista de filmes após deletar
    } catch (error) {
      console.error("Erro ao deletar filme:", error.message);
    }
  };

  useEffect(() => {
    listMovies(); // Executa ao montar o componente
  }, []);

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.cardContainer}>
          {movies.map((movie) => (
            <View key={movie._id} style={styles.container}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ReviewAdm', { id: movie._id })}
              >
                <ImageBackground
                  style={styles.imageBanner}
                  source={{ uri: movie.img }}
                  imageStyle={styles.imageStyle}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.subTitle}>{movie.gender}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(movie._id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#FFF" />
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    width: 150,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  imageBanner: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 10,
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  subTitle: {
    fontSize: 12,
    color: 'lightgray',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9400D3',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
});