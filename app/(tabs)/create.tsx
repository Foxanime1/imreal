import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera, Image as ImageIcon, X, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';
import { currentUser } from '@/data/mockData';

export default function CreateScreen() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      setSelectedImages(prev => [...prev, ...newImages].slice(0, 10)); // Max 10 images
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setSelectedImages(prev => [...prev, result.assets[0].uri].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (selectedImages.length === 0 && caption.trim() === '') {
      Alert.alert('Error', 'Please add an image or write something');
      return;
    }

    setIsPosting(true);
    
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      setSelectedImages([]);
      setCaption('');
      Alert.alert('Success', 'Your post has been shared!');
      router.back();
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity 
          style={[styles.postButton, (selectedImages.length > 0 || caption.trim()) && styles.postButtonActive]}
          onPress={handlePost}
          disabled={isPosting}
        >
          <Text style={[styles.postButtonText, (selectedImages.length > 0 || caption.trim()) && styles.postButtonTextActive]}>
            {isPosting ? 'Posting...' : 'Share'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{currentUser.username}</Text>
            <Text style={styles.displayName}>{currentUser.displayName}</Text>
          </View>
        </View>

        {/* Caption Input */}
        <View style={styles.captionSection}>
          <TextInput
            style={styles.captionInput}
            placeholder="What's on your mind?"
            placeholderTextColor={theme.colors.textSecondary}
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={2200}
          />
          <Text style={styles.characterCount}>{caption.length}/2200</Text>
        </View>

        {/* Selected Images */}
        {selectedImages.length > 0 && (
          <View style={styles.imagesSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.selectedImage} />
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <X size={16} color={theme.colors.text} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Media Options */}
        <View style={styles.mediaOptions}>
          <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
            <LinearGradient
              colors={theme.gradients.secondary}
              style={styles.mediaButtonGradient}
            >
              <ImageIcon size={24} color={theme.colors.text} />
            </LinearGradient>
            <Text style={styles.mediaButtonText}>Photo Library</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaButton} onPress={takePhoto}>
            <LinearGradient
              colors={theme.gradients.primary}
              style={styles.mediaButtonGradient}
            >
              <Camera size={24} color={theme.colors.text} />
            </LinearGradient>
            <Text style={styles.mediaButtonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Post Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Tag People</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Add Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Advanced Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  postButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surface,
  },
  postButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  postButtonText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  postButtonTextActive: {
    color: theme.colors.text,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  displayName: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  captionSection: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  captionInput: {
    ...theme.typography.body,
    color: theme.colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  characterCount: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    textAlign: 'right',
    marginTop: theme.spacing.xs,
  },
  imagesSection: {
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    position: 'relative',
    marginLeft: theme.spacing.md,
  },
  selectedImage: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.md,
  },
  removeButton: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: theme.borderRadius.full,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaOptions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  mediaButton: {
    flex: 1,
    alignItems: 'center',
  },
  mediaButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  mediaButtonText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    textAlign: 'center',
  },
  optionsSection: {
    paddingHorizontal: theme.spacing.md,
  },
  option: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
});