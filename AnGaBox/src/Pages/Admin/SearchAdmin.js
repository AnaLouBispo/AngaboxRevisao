import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../Componentes/Header/Header";
import CardMovie from "../../Componentes/Cards/CardMovie";
import FooterAdmin from "../../Componentes/Footer/FooterAdmin";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function SearchPage() {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState([]);

  const route = useRoute();
  const { id } = route.params || {};

  // Busca os dados do usuário
  const fetchUser = async () => {
    if (!id) return;

    try {
      const response = await axios.get(`http://192.168.1.2:8080/api/adm/${id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error.message);
    }
  };

  // Busca os filmes
  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://192.168.1.2:8080/api/movie');
      setMovies(response.data.movies || []);
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchMovies();
  }, [id]);

  return (
    <View style={styles.container}>
      <Header user={user.nameUser || "Visitante"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <CardMovie
              key={index}
              title={movie.title}
              description={movie.description}
              gender={movie.gender}
              awards={movie.awards}
              img={movie.img}
            />
          ))
        ) : (
          <Text style={styles.loadingText}>Carregando filmes...</Text>
        )}
      </ScrollView>
      <FooterAdmin id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
