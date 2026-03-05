/**
 * Design Tokens for GastosD
 * Following the rules in reglas.md (III. UI/UX: SISTEMA DE DISEÑO ATÓMICO)
 */

export const Colors = {
  primary: '#2563eb', // Vibrant Blue
  secondary: '#64748b', // Slate Gray
  danger: '#ef4444', // Red
  warning: '#f59e0b', // Amber/Orange
  success: '#10b981', // Emerald/Green
  background: '#f8fafc', // Light Background
  surface: '#ffffff', // White Surface
  text: '#1e293b', // Dark Slate Text
  textMuted: '#64748b',
  border: '#e2e8f0',
  white: '#ffffff',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: Colors.text,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: Colors.textMuted,
  },
};
