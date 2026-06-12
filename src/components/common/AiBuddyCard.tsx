// src/components/common/AiBuddyCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontFamily } from '../../theme';

interface AiBuddyCardProps {
  message: string;
  percentComplete?: number;
}

export const AiBuddyCard: React.FC<AiBuddyCardProps> = ({ message, percentComplete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>🤖</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Your A.I buddy</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {percentComplete !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{percentComplete}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  left: {
    marginRight: spacing.sm,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardLightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 2,
  },
  message: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.white,
  },
});
