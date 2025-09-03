import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { users } from '@/data/mockData';

const trendingHashtags = [
  '#photography', '#travel', '#art', '#fitness', '#food',
  '#nature', '#lifestyle', '#fashion', '#music', '#tech'
];

const exploreImages = [
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

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'explore' | 'people'>('explore');

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'explore' && styles.activeTab]}
          onPress={() => setActiveTab('explore')}
        >
          <Text style={[styles.tabText, activeTab === 'explore' && styles.activeTabText]}>
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'people' && styles.activeTab]}
          onPress={() => setActiveTab('people')}
        >
          <Text style={[styles.tabText, activeTab === 'people' && styles.activeTabText]}>
            People
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'explore' ? (
          <>
            {/* Trending Hashtags */}
            {searchQuery === '' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending</Text>
                <View style={styles.hashtagContainer}>
                  {trendingHashtags.map((hashtag, index) => (
                    <TouchableOpacity key={index} style={styles.hashtag}>
                      <Text style={styles.hashtagText}>{hashtag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Explore Grid */}
            <View style={styles.exploreGrid}>
              {exploreImages.map((image, index) => (
                <TouchableOpacity key={index} style={styles.exploreItem}>
                  <Image source={{ uri: image }} style={styles.exploreImage} />
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          /* People Results */
          <View style={styles.peopleContainer}>
            {(searchQuery ? filteredUsers : users).map((user) => (
              <TouchableOpacity key={user.id} style={styles.userItem}>
                <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                <View style={styles.userInfo}>
                  <View style={styles.userNameRow}>
                    <Text style={styles.userName}>{user.username}</Text>
                    {user.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.userDisplayName}>{user.displayName}</Text>
                  <Text style={styles.userStats}>
                    {user.followers.toLocaleString()} followers
                  </Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    ...theme.typography.body,
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
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.text,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  hashtag: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  hashtagText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
  },
  exploreItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  exploreImage: {
    width: '100%',
    height: '100%',
  },
  peopleContainer: {
    padding: theme.spacing.md,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  verifiedBadge: {
    marginLeft: theme.spacing.xs,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.full,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  userDisplayName: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  userStats: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  followButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  followButtonText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '600',
  },
});