1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
export const theme = {
  colors: {
    background: '#000000',
    surface: '#1a1a1a',
    surfaceVariant: '#2a2a2a',
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#45b7d1',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    textMuted: '#666666',
    border: '#333333',
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#ff6b6b',
  },
  gradients: {
    primary: ['#ff6b6b', '#ee5a52'] as const,
    secondary: ['#4ecdc4', '#44a08d'] as const,
    story: ['#ff6b6b', '#4ecdc4', '#45b7d1'] as const,
    background: ['#000000', '#1a1a1a'] as const,
    logo: ['#a855f7', '#ec4899', '#f97316'] as const,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '700' as const },
    h2: { fontSize: 24, fontWeight: '600' as const },
    h3: { fontSize: 20, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    caption: { fontSize: 14, fontWeight: '400' as const },
    small: { fontSize: 12, fontWeight: '400' as const },
  },
};
Unsaved Changes

Reset All

Save
App Preview
+ New Terminal
