import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function CardReviewAdmin() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { id } = route.params;
  const [reviews, setReviews] = useState([]);

  const listAllReviews = async () => {
    try {
      const response = await axios.get(`http://192.168.1.2:8080/api/post/about/${id}`);
      setReviews(response.data.moviePosts);
      console.log("API Response: ", response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    listAllReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.1.2:8080/api/post/${id}`);
      Alert.alert('Review deleted');
      console.log('API Response: ', response.data);
      listAllReviews();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9400D3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <View key={review._id} style={styles.reviewContainer}>
          <View style={styles.divider} />
          <Text style={styles.authorText}>{review.author}</Text>
          <Text style={styles.reviewText}>{review.content}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(review._id)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#9400D3',
    fontFamily: 'Montserrat_700Bold',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#9400D3',
    marginVertical: 10,
  },
  reviewContainer: {
    backgroundColor: '#f0f0f5',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    position: 'relative',
  },
  authorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat_700Bold',
  },
  reviewText: {
    fontSize: 16,
    color: '#4a4a4a',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#9400D3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
});
