// src/components/ui/Tag.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, fontFamily } from '../../theme';

interface TagProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const Tag: React.FC<TagProps> = ({
  label,
  backgroundColor = colors.pillBg,
  textColor = colors.textPrimary,
  style,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
});
