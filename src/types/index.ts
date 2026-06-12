// src/types/index.ts

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'active' | 'locked';
  actionLabel?: string;
}

export interface Category {
  id: string;
  label: string;
  count: number;
}

export interface SkillProgressData {
  day: string;
  value: number;
  isHighlighted?: boolean;
}

export interface CourseCard {
  id: string;
  category: string;
  title: string;
  lessonCount: number;
  duration: string;
  backgroundColor: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Analytics: undefined;
  LessonDetail: { lessonId: string };
};

export type BottomTabParamList = {
  HomeTab: undefined;
  LessonsTab: undefined;
  AnalyticsTab: undefined;
  ProfileTab: undefined;
};
