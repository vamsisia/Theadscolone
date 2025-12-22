import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { AuthProvider } from '@/providers/AuthProvider';


const myTheme = {
  ...DarkTheme,
  colors : {
      ...DarkTheme.colors,
      primary : 'white',
      card :'#101010',
      background: '#000000',
  }
}

export default function RootLayout() {
// 1. The Detective: "Is the phone in dark mode?"
  return (
    // 2. The Painter: "Okay, I will paint the Headers/Tabs Dark or Light based on the detective."
    <ThemeProvider value={myTheme}>
      <AuthProvider>
      <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}