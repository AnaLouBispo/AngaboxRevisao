import React from 'react'
import { Image, StyleSheet, Text, View, } from 'react-native'
import MyButton from '../Componentes/Button'
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Initial() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../Assets/Images/logoImage.png')}
      />
      <Text style={styles.logo}>AngaBox</Text>
      <Text style={styles.text1}>Share your opinions, discover recommendations</Text>
      <Text style={styles.text2}>and dive into the best stories of cinema!</Text>
      <MyButton
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
      <MyButton
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <MyButton
        title="Admin"
        onPress={() => navigation.navigate("LoginAdmin")}
      />

    </View>
  )
}const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    marginBottom: 20, // Dá espaço entre a imagem e o próximo elemento
    width: 200, // Ajuste o tamanho para não ocupar muito espaço
    height: 200,
    resizeMode: 'contain', // Garante que a imagem não distorça
  },
  logo: {
    fontSize: 36,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 20,
    color: 'black',
  },
  text1: {
    color: 'gray',
    textAlign: 'center', // Centraliza o texto
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 5, // Dá um espaçamento entre os textos
  },
  text2: {
    color: 'gray',
    textAlign: 'center', // Centraliza o texto
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 20, // Espaço antes dos botões
  },
});
