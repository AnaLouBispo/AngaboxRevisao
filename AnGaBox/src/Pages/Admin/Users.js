import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderImage from '../../Componentes/Header/HeaderImage';
import FooterAdmin from '../../Componentes/Footer/FooterAdmin';
import axios from 'axios';

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  // Função para listar todos os usuários
  const listAllUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.9:8080/api/user');
      setUsers(response.data);
    } catch (error) {
      console.log('Erro ao buscar usuários:', error);
    }
  };

  // useEffect para carregar os usuários ao montar o componente
  useEffect(() => {
    listAllUsers();
  }, []);

  // Função para excluir um usuário
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.9:8080/api/users/${id}`);
      Alert.alert('Sucesso', 'Usuário deletado com sucesso.');
      listAllUsers(); // Atualiza a lista de usuários após a exclusão
    } catch (error) {
      console.log('Erro ao deletar usuário:', error);
    }
  };

  // Confirmação antes de deletar
  const confirmDelete = (id) => {
    Alert.alert(
      'Deletar Usuário',
      'Tem certeza que deseja deletar este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => handleDelete(id) },
      ],
      { cancelable: true }
    );
  };

  // Renderiza cada usuário
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <TouchableOpacity onPress={() => confirmDelete(item.id)}>
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderImage />
      <ScrollView style={styles.containerScroll}>
        <Text style={styles.title}>Lista de Usuários</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>Nenhum usuário disponível</Text>
          }
        />
      </ScrollView>
      <FooterAdmin />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerScroll: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9400D3',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    color: '#333',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});
