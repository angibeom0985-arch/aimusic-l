import React from 'react';

// Types for Lyrics Generator (aimusic-l)
export enum AppStep {
  GENRE,
  TITLE,
  THEME,
  GENERATING,
  RESULT,
}

export interface Selections {
  genre: string;
  title: string;
  theme: string;
}

// Types for Thumbnail Generator (aimusic-i)
export interface TagData {
  label: string;
  value: string;
}

export interface SubGenre {
  name: string;
  tags: TagData[];
}

export type PromptData = {
  [genre: string]: SubGenre[];
};

export interface CustomizationOptionValue {
  en: string;
  ko: string;
}

export interface CustomizationCategory {
  title: string;
  options: CustomizationOptionValue[];
  state: string | null;
  setter: React.Dispatch<React.SetStateAction<string | null>>;
}
