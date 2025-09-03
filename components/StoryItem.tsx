import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import { Story } from '@/types/user';
import { theme } from '@/constants/theme';

interface StoryItemProps {
  story: Story;
  isAddStory?: boolean;
  onPress: () => void;
}

export default function StoryItem({ story, isAddStory = false, onPress }: StoryItemProps) {
  if (isAddStory) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.addStoryContainer}>
          <Image source={{ uri: story.user.avatar }} style={styles.avatar} />
          <View style={styles.addButton}>
            <Plus size={16} color={theme.colors.text} />
          </View>
        </View>
        <Text style={styles.username} numberOfLines={1}>
          Add story
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={story.viewed ? [theme.colors.textMuted, theme.colors.textMuted] : theme.gradients.story}
        style={styles.gradientBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: story.user.avatar }} style={styles.avatar} />
        </View>
      </LinearGradient>
      <Text style={styles.username} numberOfLines={1}>
        {story.user.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 70,
  },
  gradientBorder: {
    width: 66,
    height: 66,
    borderRadius: theme.borderRadius.full,
    padding: 2,
    marginBottom: theme.spacing.xs,
  },
  avatarContainer: {
    width: 62,
    height: 62,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    padding: 2,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: theme.borderRadius.full,
  },
  addStoryContainer: {
    width: 66,
    height: 66,
    marginBottom: theme.spacing.xs,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  username: {
    ...theme.typography.small,
    color: theme.colors.text,
    textAlign: 'center',
  },
});