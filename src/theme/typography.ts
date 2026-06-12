// src/theme/typography.ts
import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'Nunito_400Regular',
  semiBold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
} as const;

export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily: fontFamily.extraBold,
    fontSize: 28,
    lineHeight: 36,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 30,
  },
  h3: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 26,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
  },
  bodySemiBold: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 22,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  captionSemiBold: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 18,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    lineHeight: 16,
  },
};
