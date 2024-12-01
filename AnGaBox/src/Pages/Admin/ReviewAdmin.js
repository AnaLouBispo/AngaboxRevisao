import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import MyButton from '../../Componentes/Button';
import FooterAdmin from '../../Componentes/Footer/FooterAdmin';
import CardReviewAdmin from '../../Componentes/Cards/CardReviewAdmin';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function ReviewAdmin() {
  const route = useRoute();
  const { id } = route.params || {};
  const [movie, setMovie] = useState(null);
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const listMovies = async () => {
    try {
      const response = await axios.get(`http://192.168.1.2:8080/api/movie/${id}`);
      setMovie(response.data.movieFound);
    } catch (error) {
      console.error("Erro ao buscar o filme:", error);
    }
  };

  useEffect(() => {
    listMovies();
  }, [id]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9400D3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {movie && (
          <>
            <Image
              style={styles.imageHeader}
              source={require("../../Assets/Images/header.png")}
            />
            <Image style={styles.image} source={{ uri: movie.img }} />
            <Text style={styles.title}>
              {movie?.title || "Titulo indisponível"}
            </Text>
            <Text style={styles.question}>
              {movie?.description || "Descrição indisponível"}
            </Text>
          </>
        )}
        <Text style={styles.sectionTitle}>REVIEWS</Text>
        {/* Cards de Review */}
        <CardReviewAdmin />
      </ScrollView>
      <FooterAdmin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 5, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  imageHeader: {
    width: '100%',
    height: 100, // Diminuído para caber melhor em telas pequenas
    resizeMode: 'cover', // Ajusta o modo de preenchimento da imagem
    marginBottom: 10,
  },
  image: {
    width: 150, // Ajustado para caber melhor na tela do A01
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18, // Fonte menor para caber melhor no A01
    color: 'black',
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 8,
  },
  question: {
    fontSize: 12, // Fonte menor para não ocupar muito espaço
    color: 'gray',
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'justify',
    paddingHorizontal: 8,
    lineHeight: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16, // Ajustado para uma tela menor
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 8,
    marginBottom: 8,
    color: '#9400D3',
    fontFamily: 'Montserrat_700Bold',
  },
  containerButton: {
    alignItems: 'center',
    marginBottom: 10, // Menor margem para economizar espaço
  },
  divider: {
    marginVertical: 5,
    width: '85%', // Ajustado para caber melhor
    height: 1.5,
    backgroundColor: '#9400D3',
  },
  reviewText: {
    fontSize: 12, // Fonte reduzida para economizar espaço
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Montserrat_400Regular',
  },
});