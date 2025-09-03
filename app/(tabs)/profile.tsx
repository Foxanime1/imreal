import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Settings, Grid, Bookmark, Tag, MoreHorizontal } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';
import { currentUser } from '@/data/mockData';

const { width: screenWidth } = Dimensions.get('window');
const imageSize = (screenWidth - theme.spacing.md * 2 - 2) / 3;

const userPosts = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}m`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{currentUser.username}</Text>
        <TouchableOpacity>
          <Settings size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <LinearGradient
              colors={theme.gradients.story}
              style={styles.avatarGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
              </View>
            </LinearGradient>
            
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{formatCount(currentUser.posts)}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <TouchableOpacity style={styles.stat}>
                <Text style={styles.statNumber}>{formatCount(currentUser.followers)}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stat}>
                <Text style={styles.statNumber}>{formatCount(currentUser.following)}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <Text style={styles.displayName}>{currentUser.displayName}</Text>
            {currentUser.bio && (
              <Text style={styles.bio}>{currentUser.bio}</Text>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <MoreHorizontal size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.addHighlight}>
              <View style={styles.addHighlightCircle}>
                <Text style={styles.addHighlightText}>+</Text>
              </View>
              <Text style={styles.highlightLabel}>New</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Grid size={20} color={activeTab === 'posts' ? theme.colors.text : theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Bookmark size={20} color={activeTab === 'saved' ? theme.colors.text : theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tagged' && styles.activeTab]}
            onPress={() => setActiveTab('tagged')}
          >
            <Tag size={20} color={activeTab === 'tagged' ? theme.colors.text : theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {userPosts.map((image, index) => (
            <TouchableOpacity key={index} style={styles.postItem}>
              <Image source={{ uri: image }} style={styles.postImage} />
            </TouchableOpacity>
          ))}
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
  profileSection: {
    padding: theme.spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarGradient: {
    width: 90,
    height: 90,
    borderRadius: theme.borderRadius.full,
    padding: 3,
    marginRight: theme.spacing.lg,
  },
  avatarContainer: {
    width: 84,
    height: 84,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    padding: 3,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: theme.borderRadius.full,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  profileDetails: {
    marginBottom: theme.spacing.md,
  },
  displayName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  bio: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  editButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  editButtonText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  shareButtonText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  moreButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightsSection: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  addHighlight: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  addHighlightCircle: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  addHighlightText: {
    ...theme.typography.h2,
    color: theme.colors.textSecondary,
  },
  highlightLabel: {
    ...theme.typography.small,
    color: theme.colors.text,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.text,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  postItem: {
    width: imageSize,
    height: imageSize,
    margin: 1,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
});