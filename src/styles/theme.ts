export const theme = {
  colors: {
    background: '#f5f5f7',
    surface: '#ffffff',
    border: '#e0e0e6',
    text: '#1f1f2e',
    mutedText: '#6b6b80',
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    danger: '#dc2626',
    dangerHover: '#b91c1c',
  },
  radius: {
    sm: '6px',
    md: '10px',
  },
  shadow: {
    sm: '0 1px 3px rgba(15, 23, 42, 0.08)',
  },
  spacing: (factor: number) => `${factor * 4}px`,
}


