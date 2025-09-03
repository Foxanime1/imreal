import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'gradient' | 'solid' | 'text';
}

export default function Logo({ size = 'medium', variant = 'gradient' }: LogoProps) {
  const logoSize = {
    small: { width: 36, height: 36, fontSize: 18, padding: 8 },
    medium: { width: 48, height: 48, fontSize: 22, padding: 10 },
    large: { width: 64, height: 64, fontSize: 28, padding: 12 }
  }[size];

  if (variant === 'text') {
    return (
      <LinearGradient
        colors={theme.gradients.logo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.textContainer, {
          width: logoSize.width + 8,
          height: logoSize.height,
          borderRadius: logoSize.height * 0.25
        }]}
      >
        <Text style={[styles.logoText, { fontSize: logoSize.fontSize }]}>iR</Text>
      </LinearGradient>
    );
  }

  const LogoContent = () => (
    <View style={[styles.logoContainer, { width: logoSize.width, height: logoSize.height }]}>
      {/* Custom 'i' with modern design */}
      <View style={styles.letterI}>
        <View style={[styles.iDot, { 
          width: logoSize.fontSize * 0.18, 
          height: logoSize.fontSize * 0.18,
          borderRadius: logoSize.fontSize * 0.09
        }]} />
        <View style={[styles.iLine, { 
          width: logoSize.fontSize * 0.18, 
          height: logoSize.fontSize * 0.55,
          borderRadius: logoSize.fontSize * 0.09
        }]} />
      </View>
      
      {/* Custom 'R' with modern design */}
      <View style={styles.letterR}>
        {/* Vertical line */}
        <View style={[styles.rVertical, {
          width: logoSize.fontSize * 0.18,
          height: logoSize.fontSize * 0.75,
          borderRadius: logoSize.fontSize * 0.09
        }]} />
        {/* Top horizontal */}
        <View style={[styles.rTopHorizontal, {
          width: logoSize.fontSize * 0.35,
          height: logoSize.fontSize * 0.18,
          borderRadius: logoSize.fontSize * 0.09,
          left: logoSize.fontSize * 0.18
        }]} />
        {/* Top right curve */}
        <View style={[styles.rTopCurve, {
          width: logoSize.fontSize * 0.18,
          height: logoSize.fontSize * 0.25,
          borderRadius: logoSize.fontSize * 0.09,
          right: 0,
          top: logoSize.fontSize * 0.18
        }]} />
        {/* Middle horizontal */}
        <View style={[styles.rMiddleHorizontal, {
          width: logoSize.fontSize * 0.25,
          height: logoSize.fontSize * 0.18,
          borderRadius: logoSize.fontSize * 0.09,
          left: logoSize.fontSize * 0.18,
          top: logoSize.fontSize * 0.28
        }]} />
        {/* Diagonal leg */}
        <View style={[styles.rLeg, {
          width: logoSize.fontSize * 0.32,
          height: logoSize.fontSize * 0.18,
          borderRadius: logoSize.fontSize * 0.09,
          top: logoSize.fontSize * 0.45,
          left: logoSize.fontSize * 0.25
        }]} />
      </View>
    </View>
  );

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={theme.gradients.logo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientContainer, { 
          width: logoSize.width + logoSize.padding * 2, 
          height: logoSize.height + logoSize.padding,
          borderRadius: logoSize.height * 0.3
        }]}
      >
        <LogoContent />
      </LinearGradient>
    );
  }

  return <LogoContent />;
}

const styles = StyleSheet.create({
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    color: '#ffffff',
    fontWeight: '800',
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterI: {
    alignItems: 'center',
    marginRight: 6,
  },
  iDot: {
    backgroundColor: '#ffffff',
    marginBottom: 3,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  iLine: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  letterR: {
    position: 'relative',
    width: 40,
    height: 32,
  },
  rVertical: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    left: 0,
    top: 0,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  rTopHorizontal: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: 0,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  rTopCurve: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  rMiddleHorizontal: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  rLeg: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    transform: [{ rotate: '30deg' }],
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});