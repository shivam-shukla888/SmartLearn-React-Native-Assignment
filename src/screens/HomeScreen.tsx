// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, CourseCard, Category } from '../types';
import { AiBuddyCard } from '../components/common/AiBuddyCard';
import { BottomNav } from '../components/common/BottomNav';
import { colors, spacing, radius, fontFamily, typography } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.62;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'letters', label: 'Letters', count: 3 },
  { id: 'colors', label: 'Colors', count: 4 },
];

const COURSES: CourseCard[] = [
  {
    id: '1',
    category: 'Colors',
    title: 'Learn colors with objects',
    lessonCount: 12,
    duration: '10 min',
    backgroundColor: colors.cardPurple,
  },
  {
    id: '2',
    category: 'Letters',
    title: 'Learn ABC with fun sounds',
    lessonCount: 26,
    duration: '30 min',
    backgroundColor: colors.cardYellow,
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>M</Text>
            </View>
            <View style={styles.greeting}>
              <Text style={styles.greetingName}>Hello Max 👋</Text>
              <Text style={styles.greetingSubtitle}>Good Morning</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.langPill}>
              <Text style={styles.langText}>🇬🇧 English</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Text style={styles.notifIcon}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Buddy Banner */}
        <View style={styles.buddyBanner}>
          <AiBuddyCard message="You're learning great today!" />
        </View>

        {/* Today's Pick */}
        <View style={styles.todayCard}>
          <View style={styles.todayLeft}>
            <Text style={styles.todayLabel}>Today's pick: Shapes</Text>
            <View style={styles.todayMeta}>
              <Text style={styles.metaText}>☰ 12 lessons</Text>
              <Text style={styles.metaText}>  ⏱ 10 min</Text>
            </View>
            <Text style={styles.todayProgress}>20% complete</Text>
          </View>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => navigation.navigate('LessonDetail', { lessonId: '1' })}
          >
            <Text style={styles.playIcon}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Let's Learn */}
        <Text style={styles.sectionTitle}>Let's learn</Text>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={[
                styles.categoryTab,
                activeCategory === cat.id && styles.categoryTabActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryLabel,
                  activeCategory === cat.id && styles.categoryLabelActive,
                ]}
              >
                {cat.id === 'all' ? '' : cat.id === 'letters' ? 'Aa ' : '⊙ '}
                {cat.label}
              </Text>
              {cat.count && (
                <Text
                  style={[
                    styles.categoryCount,
                    activeCategory === cat.id && styles.categoryLabelActive,
                  ]}
                >
                  {' '}{String(cat.count).padStart(2, '0')}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Course Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesContent}
          snapToInterval={CARD_WIDTH + spacing.md}
          decelerationRate="fast"
        >
          {COURSES.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={[styles.courseCard, { backgroundColor: course.backgroundColor, width: CARD_WIDTH }]}
              onPress={() => navigation.navigate('LessonDetail', { lessonId: course.id })}
              activeOpacity={0.9}
            >
              <Text style={styles.courseCategory}>{course.category}</Text>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <View style={styles.courseMeta}>
                <Text style={styles.courseMetaText}>☰ {course.lessonCount} lessons</Text>
                <Text style={styles.courseMetaText}>  ⏱ {course.duration}</Text>
              </View>
              <View style={styles.courseIllustration}>
                <Text style={styles.illustrationEmoji}>
                  {course.category === 'Colors' ? '👧🎨' : '🔤'}
                </Text>
              </View>
              <TouchableOpacity style={styles.startBtn}>
                <Text style={styles.startBtnText}>Start learning</Text>
                <Text style={styles.startBtnIcon}> ▶</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>

      <BottomNav
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === 'analytics') navigation.navigate('Analytics');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.cardPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.primary,
  },
  greeting: {},
  greetingName: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  greetingSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  langPill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  langText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.textPrimary,
  },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: {
    fontSize: 16,
  },
  buddyBanner: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  todayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    backgroundColor: colors.backgroundGrey,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  todayLeft: {
    flex: 1,
  },
  todayLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  todayMeta: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  metaText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.textMuted,
  },
  todayProgress: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: colors.white,
    fontSize: 16,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  categoriesScroll: {
    marginBottom: spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryTab: {
    flexDirection: 'row',
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  categoryLabelActive: {
    color: colors.white,
  },
  categoryCount: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  coursesContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  courseCard: {
    borderRadius: radius.lg,
    padding: spacing.md,
    minHeight: 200,
    overflow: 'hidden',
  },
  courseCategory: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  courseTitle: {
    fontFamily: fontFamily.extraBold,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    maxWidth: '70%',
  },
  courseMeta: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  courseMetaText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.textSecondary,
  },
  courseIllustration: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.md,
  },
  illustrationEmoji: {
    fontSize: 50,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  startBtnText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  startBtnIcon: {
    fontSize: 12,
    color: colors.textPrimary,
  },
});
