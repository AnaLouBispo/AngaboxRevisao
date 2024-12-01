import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function CardReview() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  // Obtém parâmetros da rota de navegação
  const route = useRoute();
  const { id } = route.params;

  // Estado para armazenar as resenhas
  const [reviews, setReviews] = useState([]);

  // Função para listar todas as resenhas do filme a partir de uma API
  const listAllReviews = async () => {
    try {
      const response = await axios.get(`http://192.168.1.2:8080/api/post/about/${id}`);
      setReviews(response.data.moviePosts);
      console.log("resposta da api: ", response.data);
    } catch (error) {
      console.log("erro:", error);
    }
  };

  // Executa listAllReviews assim que o componente é montado
  useEffect(() => {
    listAllReviews();
  }, []);

  // Renderiza um indicador de carregamento enquanto as fontes não são carregadas
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9400D3" />
      </View>
    );
  }

  // Renderiza a interface do componente
  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <View key={review._id} style={styles.reviewContainer}>
          <View style={styles.divider} />
          <Text>{review.author}</Text>
          <Text style={styles.reviewText}>{review.content}</Text>
        </View>
      ))}
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  reviewContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9400D3",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  divider: {
    marginLeft: 10,
    height: 1.5,
    width: '90%',
    backgroundColor: '#9400D3',
    marginVertical: 10,
  },
  reviewText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
