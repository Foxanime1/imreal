import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react-native';
import { Post } from '@/types/user';
import { theme } from '@/constants/theme';

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onSave: (postId: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');

export default function PostItem({ post, onLike, onComment, onShare, onSave }: PostItemProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return `${Math.floor(diffInSeconds / 604800)}w`;
  };

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}m`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <View style={styles.usernameRow}>
              <Text style={styles.username}>{post.user.username}</Text>
              {post.user.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.timestamp}>{formatTimeAgo(post.timestamp)} ago</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {post.content && (
        <Text style={styles.content}>{post.content}</Text>
      )}

      {/* Images */}
      {post.images.length > 0 && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: post.images[currentImageIndex] }} 
            style={styles.image}
            resizeMode="cover"
          />
          {post.images.length > 1 && (
            <View style={styles.imageIndicator}>
              {post.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentImageIndex && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onLike(post.id)}
          >
            <Heart 
              size={24} 
              color={post.liked ? theme.colors.primary : theme.colors.text}
              fill={post.liked ? theme.colors.primary : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onComment(post.id)}
          >
            <MessageCircle size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onShare(post.id)}
          >
            <Send size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onSave(post.id)}>
          <Bookmark 
            size={24} 
            color={post.saved ? theme.colors.text : theme.colors.text}
            fill={post.saved ? theme.colors.text : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.likes}>{formatCount(post.likes)} likes</Text>
        {post.comments > 0 && (
          <TouchableOpacity onPress={() => onComment(post.id)}>
            <Text style={styles.comments}>View all {formatCount(post.comments)} comments</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  userDetails: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
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
  timestamp: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
  moreButton: {
    padding: theme.spacing.xs,
  },
  content: {
    ...theme.typography.body,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: screenWidth * 0.75,
  },
  imageIndicator: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.textMuted,
    marginLeft: theme.spacing.xs,
  },
  activeDot: {
    backgroundColor: theme.colors.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: theme.spacing.md,
  },
  stats: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  likes: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  comments: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});