// src/screens/LessonDetailScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Lesson } from '../types';
import { AiBuddyCard } from '../components/common/AiBuddyCard';
import { colors, spacing, radius, fontFamily, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LessonDetail'>;
  route: RouteProp<RootStackParamList, 'LessonDetail'>;
};

const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'A for Apple',
    description: 'Learn the sound of A and objects that start with A',
    duration: '2 min',
    status: 'completed',
    actionLabel: 'Replay',
  },
  {
    id: '2',
    title: 'B for Ball',
    description: 'Recognize the letter B and its phonetic sound',
    duration: '3 min',
    status: 'active',
    actionLabel: 'Continue',
  },
  {
    id: '3',
    title: 'D for Dog',
    description: 'Hear and repeat the D sound',
    duration: '5 min',
    status: 'locked',
    actionLabel: 'Start Lesson',
  },
  {
    id: '4',
    title: 'C for Cat',
    description: 'Learn the "C" sound with fun animations',
    duration: '10 min',
    status: 'locked',
    actionLabel: 'Start Lesson',
  },
  {
    id: '5',
    title: 'E for Elephant',
    description: 'Discover the E sound with elephants',
    duration: '10 min',
    status: 'locked',
    actionLabel: 'Start Lesson',
  },
];

const getStepStyle = (status: Lesson['status'], index: number) => {
  if (status === 'completed') return { bg: colors.successGreen, border: colors.successGreen, textColor: colors.white };
  if (status === 'active') return { bg: colors.white, border: colors.primary, textColor: colors.primary };
  return { bg: colors.white, border: colors.border, textColor: colors.textMuted };
};

const getCardColor = (status: Lesson['status']): string => {
  if (status === 'completed') return '#F0FAF0';
  if (status === 'active') return colors.cardPurple;
  return colors.white;
};

const getActionStyle = (actionLabel: string | undefined) => {
  if (actionLabel === 'Replay') return { bg: colors.pillBg, text: colors.textPrimary };
  if (actionLabel === 'Continue') return { bg: colors.cardPurple, text: colors.primary };
  return { bg: colors.pillBg, text: colors.textSecondary };
};

export const LessonDetailScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Hero */}
      <View style={styles.hero}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.heroEyebrow}>Letters</Text>
        <Text style={styles.heroTitle}>Learn ABC with{'\n'}fun sounds</Text>

        <View style={styles.heroMeta}>
          <View style={styles.metaTag}>
            <Text style={styles.metaText}>☰ 26 lessons</Text>
          </View>
          <View style={styles.metaTag}>
            <Text style={styles.metaText}>⏱ 1hr 30 min</Text>
          </View>
        </View>

        {/* Illustration */}
        <View style={styles.heroIllustration}>
          <Text style={styles.heroEmoji}>🔤✨</Text>
        </View>
      </View>

      {/* AI Buddy */}
      <AiBuddyCard message="You're learning great today!" percentComplete={12} />

      {/* Lesson List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lessonList}
      >
        {LESSONS.map((lesson, index) => {
          const step = getStepStyle(lesson.status, index);
          const cardColor = getCardColor(lesson.status);
          const actionStyle = getActionStyle(lesson.actionLabel);
          const displayIndex = lesson.status === 'completed' ? '✓' : String(index + 1);

          return (
            <View key={lesson.id} style={styles.lessonRow}>
              {/* Step Indicator */}
              <View style={styles.stepCol}>
                <View
                  style={[
                    styles.stepCircle,
                    { backgroundColor: step.bg, borderColor: step.border },
                  ]}
                >
                  <Text style={[styles.stepText, { color: step.textColor }]}>
                    {displayIndex}
                  </Text>
                </View>
                {index < LESSONS.length - 1 && <View style={styles.stepLine} />}
              </View>

              {/* Lesson Card */}
              <View style={[styles.lessonCard, { backgroundColor: cardColor }]}>
                <View style={styles.lessonCardTop}>
                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDesc}>{lesson.description}</Text>
                  </View>
                  <Text style={styles.lessonDuration}>⏱ {lesson.duration}</Text>
                </View>

                {lesson.actionLabel && (
                  <View style={styles.lessonCardBottom}>
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: actionStyle.bg }]}
                    >
                      <Text style={[styles.actionText, { color: actionStyle.text }]}>
                        {lesson.actionLabel}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playCircle}>
                      <Text style={styles.playIcon}>▶</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          );
        })}
        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  hero: {
    backgroundColor: colors.cardYellow,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  backIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  heroEyebrow: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 26,
    color: colors.textPrimary,
    lineHeight: 34,
    marginBottom: spacing.md,
    maxWidth: '65%',
  },
  heroMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaTag: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  metaText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.textSecondary,
  },
  heroIllustration: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
  },
  heroEmoji: {
    fontSize: 64,
  },
  lessonList: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  lessonRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  stepCol: {
    alignItems: 'center',
    width: 36,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: spacing.xs,
    minHeight: 16,
  },
  lessonCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lessonCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lessonInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  lessonTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  lessonDesc: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  lessonDuration: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.textMuted,
  },
  lessonCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  actionBtn: {
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  actionText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
  playCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: colors.white,
    fontSize: 11,
  },
});
