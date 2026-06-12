// src/screens/AnalyticsScreen.tsx
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
import { RootStackParamList, SkillProgressData } from '../types';
import { BottomNav } from '../components/common/BottomNav';
import { colors, spacing, radius, fontFamily, typography } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Analytics'>;
};

type SkillTab = 'Letters' | 'Colors' | 'Shapes' | 'Animals';

const SKILL_TABS: SkillTab[] = ['Letters', 'Colors', 'Shapes', 'Animals'];

const STREAK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const STREAK_ACTIVE = [true, true, true, false, false, false, false];

const CHART_DATA: SkillProgressData[] = [
  { day: 'Mon', value: 55 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 70 },
  { day: 'Thu', value: 85, isHighlighted: true },
  { day: 'Fri', value: 45 },
  { day: 'Sat', value: 30 },
  { day: 'Sun', value: 40 },
];

const CHART_MAX_HEIGHT = 120;

export const AnalyticsScreen: React.FC<Props> = ({ navigation }) => {
  const [activeSkill, setActiveSkill] = useState<SkillTab>('Letters');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakTop}>
            <Text style={styles.streakTitle}>Your streak</Text>
            <Text style={styles.streakCount}>
              3822<Text style={styles.streakTotal}>/5000</Text>
            </Text>
          </View>

          {/* Streak Bar */}
          <View style={styles.streakBar}>
            {STREAK_DAYS.map((day, i) => (
              <View key={day} style={styles.streakDayCol}>
                <View
                  style={[
                    styles.streakTick,
                    STREAK_ACTIVE[i] && styles.streakTickActive,
                    i === 3 && styles.streakTickFire,
                  ]}
                >
                  {i === 3 && <Text style={styles.fireEmoji}>🔥</Text>}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.streakDaysRow}>
            {STREAK_DAYS.map((day) => (
              <Text key={day} style={styles.streakDayLabel}>{day}</Text>
            ))}
          </View>

          {/* Tip */}
          <View style={styles.tipRow}>
            <Text style={styles.tipIcon}>⏱</Text>
            <Text style={styles.tipText}>You learn best with quick 5-min lessons.</Text>
            <TouchableOpacity>
              <Text style={styles.tipClose}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Skill Progress Card */}
        <View style={styles.skillCard}>
          <View style={styles.skillCardHeader}>
            <View>
              <Text style={styles.skillTitle}>Skill progress</Text>
              <Text style={styles.skillSubtitle}>Avg improvement this week</Text>
            </View>
            <TouchableOpacity style={styles.weekPill}>
              <Text style={styles.weekText}>This Week ∨</Text>
            </TouchableOpacity>
          </View>

          {/* Skill Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.skillTabsContent}
          >
            {SKILL_TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveSkill(tab)}
                style={[
                  styles.skillTab,
                  activeSkill === tab && styles.skillTabActive,
                ]}
              >
                <Text
                  style={[
                    styles.skillTabText,
                    activeSkill === tab && styles.skillTabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bar Chart */}
          <View style={styles.chart}>
            {CHART_DATA.map((item) => {
              const barH = (item.value / 100) * CHART_MAX_HEIGHT;
              return (
                <View key={item.day} style={styles.barCol}>
                  {item.isHighlighted && (
                    <View style={styles.badgeAboveBar}>
                      <Text style={styles.badgeText}>+30%</Text>
                    </View>
                  )}
                  <View style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: barH,
                          backgroundColor: item.isHighlighted
                            ? colors.primary
                            : 'transparent',
                          borderWidth: item.isHighlighted ? 0 : 1.5,
                          borderColor: colors.border,
                          borderStyle: 'dashed',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{item.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>

      <BottomNav
        activeTab="analytics"
        onTabPress={(tab) => {
          if (tab === 'home') navigation.navigate('Home');
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
  headerTitle: {
    ...typography.h1,
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
  streakCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.backgroundGrey,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  streakTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  streakTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  streakCount: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  streakTotal: {
    fontFamily: fontFamily.regular,
    color: colors.textMuted,
  },
  streakBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  streakDayCol: {
    alignItems: 'center',
    flex: 1,
  },
  streakTick: {
    width: 18,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTickActive: {
    backgroundColor: colors.streakGreen,
  },
  streakTickFire: {
    backgroundColor: 'transparent',
  },
  fireEmoji: {
    fontSize: 20,
  },
  streakDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  streakDayLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.textMuted,
    flex: 1,
    textAlign: 'center',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  tipIcon: {
    fontSize: 14,
  },
  tipText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  tipClose: {
    fontSize: 14,
    color: colors.textMuted,
  },
  skillCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.analyticsCard,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  skillCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  skillTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  skillSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  weekPill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  weekText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  skillTabsContent: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  skillTab: {
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  skillTabActive: {
    backgroundColor: colors.primary,
  },
  skillTabText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  skillTabTextActive: {
    color: colors.white,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_MAX_HEIGHT + 40,
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    height: CHART_MAX_HEIGHT,
    justifyContent: 'flex-end',
    width: '70%',
  },
  bar: {
    width: '100%',
    borderRadius: radius.sm,
  },
  barLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  badgeAboveBar: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    marginBottom: spacing.xs,
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.white,
  },
});
