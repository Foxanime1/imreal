import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StoryItem from '@/components/StoryItem';
import PostItem from '@/components/PostItem';
import Logo from '@/components/Logo';
import { stories, posts } from '@/data/mockData';
import { theme } from '@/constants/theme';
import { Post, Story } from '@/types/user';

export default function HomeScreen() {
  const [postsData, setPostsData] = useState<Post[]>(posts);

  const handleLike = (postId: string) => {
    setPostsData(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPostsData(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  const handleStoryPress = (story: Story) => {
    console.log('Open story:', story.id);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostItem
      post={item}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
      onSave={handleSave}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={theme.gradients.background}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Camera size={24} color={theme.colors.text} />
          <Logo size="medium" variant="gradient" />
          <MessageCircle size={24} color={theme.colors.text} />
        </View>
      </LinearGradient>

      <FlatList
        data={postsData}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.storiesContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesContent}
            >
              {stories.map((story, index) => (
                <StoryItem
                  key={story.id}
                  story={story}
                  isAddStory={index === 0}
                  onPress={() => handleStoryPress(story)}
                />
              ))}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },

  storiesContainer: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  storiesContent: {
    paddingHorizontal: theme.spacing.md,
  },
});