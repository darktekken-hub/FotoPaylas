import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

export default function App() {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: 'https://picsum.photos/400/400?random=1',
      username: 'ahmet_yilmaz',
      likes: 24,
      caption: 'Harika bir gün! 🌊',
      liked: false
    },
    {
      id: 2,
      url: 'https://picsum.photos/400/400?random=2',
      username: 'ayse_kaya',
      likes: 42,
      caption: 'Mavi gökyüzü 🌤️',
      liked: false
    },
    {
      id: 3,
      url: 'https://picsum.photos/400/400?random=3',
      username: 'mehmet_demir',
      likes: 15,
      caption: 'Deniz kenarında ☀️',
      liked: false
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newCaption, setNewCaption] = useState('');

  const handleLike = (id) => {
    setPhotos(photos.map(photo => {
      if (photo.id === id) {
        return {
          ...photo,
          liked: !photo.liked,
          likes: photo.liked ? photo.likes - 1 : photo.likes + 1
        };
      }
      return photo;
    }));
  };

  const addNewPhoto = () => {
    if (newCaption.trim()) {
      const newPhoto = {
        id: photos.length + 1,
        url: `https://picsum.photos/400/400?random=${photos.length + 10}`,
        username: 'benim_hesabim',
        likes: 0,
        caption: newCaption,
        liked: false
      };
      setPhotos([newPhoto, ...photos]);
      setNewCaption('');
      setShowModal(false);
      Alert.alert('Başarılı!', 'Fotoğraf paylaşıldı! 🎉');
    } else {
      Alert.alert('Uyarı', 'Lütfen bir açıklama girin!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>📷 FotoPaylaş</Text>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Photo Feed */}
      <ScrollView style={styles.feed}>
        {photos.map(photo => (
          <View key={photo.id} style={styles.card}>
            {/* User Header */}
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {photo.username[0].toUpperCase()}
                </Text>
              </View>
              <Text style={styles.username}>{photo.username}</Text>
            </View>

            {/* Photo */}
            <Image 
              source={{ uri: photo.url }}
              style={styles.photoImage}
            />

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity 
                onPress={() => handleLike(photo.id)}
                style={styles.likeButton}
              >
                <Text style={styles.likeIcon}>
                  {photo.liked ? '❤️' : '🤍'}
                </Text>
                <Text style={styles.likeText}>{photo.likes}</Text>
              </TouchableOpacity>
            </View>

            {/* Caption */}
            <View style={styles.captionBox}>
              <Text style={styles.captionUser}>{photo.username}</Text>
              <Text style={styles.captionText}> {photo.caption}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Photo Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Yeni Fotoğraf 📸</Text>
            
            <View style={styles.previewBox}>
              <Text style={styles.previewEmoji}>🖼️</Text>
              <Text style={styles.previewText}>Rastgele fotoğraf eklenecek</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Açıklama yaz..."
              value={newCaption}
              onChangeText={setNewCaption}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setNewCaption('');
                }}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addNewPhoto}
                style={[styles.modalButton, styles.shareButton]}
              >
                <Text style={styles.shareText}>Paylaş</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe',
  },
  header: {
    backgroundColor: '#0284c7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#0284c7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  feed: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#bae6fd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0c4a6e',
  },
  photoImage: {
    width: '100%',
    height: 350,
    backgroundColor: '#bae6fd',
  },
  actions: {
    padding: 12,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  likeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c4a6e',
  },
  captionBox: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexWrap: 'wrap',
  },
  captionUser: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0c4a6e',
  },
  captionText: {
    fontSize: 14,
    color: '#334155',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0284c7',
    marginBottom: 20,
    textAlign: 'center',
  },
  previewBox: {
    backgroundColor: '#e0f2fe',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  previewEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  previewText: {
    fontSize: 14,
    color: '#0369a1',
  },
  input: {
    borderWidth: 2,
    borderColor: '#bae6fd',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  cancelText: {
    color: '#64748b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#0284c7',
  },
  shareText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});