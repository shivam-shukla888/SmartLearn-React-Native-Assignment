// src/screens/OnboardingScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Button } from '../components/ui/Button';
import { colors, spacing, radius, fontFamily, typography } from '../theme';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  highlight: string;
  description: string;
  backgroundColor: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Personalized',
    highlight: 'Learning',
    description: "Lessons adapt to your child's pace, focusing on what they need most.",
    backgroundColor: colors.cardBlue,
  },
  {
    id: '2',
    title: 'Fun Games &',
    highlight: 'Activities',
    description: 'Make learning exciting with interactive games and creative activities.',
    backgroundColor: colors.cardGreen,
  },
  {
    id: '3',
    title: 'Instant',
    highlight: 'Feedback',
    description: 'Get real-time progress updates so you always know how your child is doing.',
    backgroundColor: colors.cardPurple,
  },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo + Brand */}
      <View style={styles.brandSection}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>📖</Text>
        </View>
        <Text style={styles.brandName}>SmartLearn</Text>
      </View>

      {/* Feature Chips */}
      <View style={styles.chipsContainer}>
        <View style={[styles.chip, styles.chipPink, { transform: [{ rotate: '-4deg' }] }]}>
          <Text style={styles.chipText}>Instant Feedback</Text>
        </View>
        <View style={[styles.chip, styles.chipGreen, { transform: [{ rotate: '2deg' }] }]}>
          <Text style={styles.chipText}>Fun Games & Activities</Text>
        </View>
      </View>

      {/* Main Card */}
      <View style={[styles.card, { backgroundColor: SLIDES[activeIndex].backgroundColor }]}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{SLIDES[activeIndex].title}</Text>
          <View style={styles.highlightPill}>
            <Text style={styles.highlightText}>{SLIDES[activeIndex].highlight}</Text>
          </View>
          <Text style={styles.cardDescription}>{SLIDES[activeIndex].description}</Text>

          {/* Dots */}
          <View style={styles.dotsRow}>
            {SLIDES.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === activeIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Illustration placeholder */}
        <View style={styles.illustrationPlaceholder}>
          <Text style={styles.illustrationEmoji}>🧒🍎</Text>
        </View>
      </View>

      {/* CTA Buttons */}
      <View style={styles.actions}>
        <Button
          label="Sign up"
          onPress={() => navigation.navigate('Home')}
          variant="primary"
        />
        <View style={styles.spacer} />
        <Button
          label="Log in"
          onPress={() => navigation.navigate('Home')}
          variant="outline"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
  },
  brandSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.cardLightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoEmoji: {
    fontSize: 30,
  },
  brandName: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  chipsContainer: {
    alignItems: 'center',
    marginBottom: -spacing.lg,
    zIndex: 10,
  },
  chip: {
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  chipPink: {
    backgroundColor: '#F4C2C2',
    alignSelf: 'flex-end',
    marginRight: spacing.lg,
  },
  chipGreen: {
    backgroundColor: colors.cardGreen,
    alignSelf: 'flex-start',
    marginLeft: spacing.lg,
  },
  chipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginVertical: spacing.lg,
    minHeight: 260,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    zIndex: 2,
  },
  cardTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 26,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  highlightPill: {
    backgroundColor: colors.learningPill,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  highlightText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primary,
  },
  cardDescription: {
    ...typography.body,
    color: colors.textSecondary,
    maxWidth: '65%',
    marginBottom: spacing.lg,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
  illustrationPlaceholder: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
  },
  illustrationEmoji: {
    fontSize: 60,
  },
  actions: {
    paddingBottom: spacing.xl,
  },
  spacer: {
    height: spacing.sm,
  },
});
