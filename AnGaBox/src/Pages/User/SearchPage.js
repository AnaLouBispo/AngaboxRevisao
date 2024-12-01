import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../Componentes/Header/Header";
import CardMovie from "../../Componentes/Cards/CardMovie";
import Footer from "../../Componentes/Footer/Footer";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function SearchPage() {
  // Estado para armazenar os dados do usuário e dos filmes
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]); // Estado para armazenar os filmes

  const route = useRoute();
  const { id } = route.params || {};

  // Função para buscar os dados do usuário pela API
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://192.168.1.8:8080/api/user/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error.message);
      if (error.response) {
        console.error("Código de status da resposta:", error.response.status);
      }
    }
  };

  // Função para buscar os filmes pela API
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://192.168.1.8:8080/api/movie"); // Substitua pela URL correta da sua API
      setMovies(response.data.movies); // Certifique-se de que o endpoint retorna um array no campo `movies`
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error.message);
      if (error.response) {
        console.error("Código de status da resposta:", error.response.status);
      }
    }
  };

  // useEffect para buscar os dados do usuário e dos filmes
  useEffect(() => {
    if (id) {
      fetchUser();
    } else {
      console.warn("ID do usuário não fornecido.");
      console.log("ID:", id);
    }
    fetchMovies(); // Chamada para buscar os filmes
  }, [id]);

  return (
    <View style={styles.container}>
      <Text>Teste</Text>
      <Header />
      <ScrollView>
        {/* Renderização dinâmica dos cards de filmes */}
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <CardMovie
              key={index} // Chave única para cada item
              title={movie.title}
              description={movie.description}
              gender={movie.gender}
              awards={movie.awards}
              img={movie.img} // Caso o CardMovie use imagens
            />
          ))
        ) : (
          <Text>Carregando filmes...</Text>
        )}
      </ScrollView>
      <Footer id={id} />
    </View>
  );
}

// Estilização da página
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
});
