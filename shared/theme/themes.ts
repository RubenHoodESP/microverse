export type Theme = 'light' | 'dark';

export const themes: Record<Theme, Record<string, string>> = {
  light: {
    '--background': '#ffffff',
    '--foreground': '#171717',
  },
  dark: {
    '--background': '#0a0a0a',
    '--foreground': '#ededed',
  },
};
