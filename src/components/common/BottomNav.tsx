// src/components/common/BottomNav.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors, spacing, radius } from '../../theme';

type TabName = 'home' | 'lessons' | 'analytics' | 'profile';

interface BottomNavProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

interface NavItem {
  key: TabName;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', icon: '⌂', label: 'Home' },
  { key: 'lessons', icon: '☰', label: 'Lessons' },
  { key: 'analytics', icon: '▤', label: 'Analytics' },
  { key: 'profile', icon: '○', label: 'Profile' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => onTabPress(item.key)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
              <Text style={[styles.icon, isActive && styles.iconActive]}>{item.icon}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: colors.primary,
  },
  icon: {
    fontSize: 20,
    color: colors.textMuted,
  },
  iconActive: {
    color: colors.white,
  },
});
