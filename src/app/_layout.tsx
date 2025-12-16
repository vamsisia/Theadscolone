import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { Slot } from 'expo-router';
export default function RootLayout() {
const myTheme = {
    ...DarkTheme,
    colors : {
        ...DarkTheme.colors,
        primary : 'white',
    }
}
// 1. The Detective: "Is the phone in dark mode?"
  return (
    // 2. The Painter: "Okay, I will paint the Headers/Tabs Dark or Light based on the detective."
    <ThemeProvider value={myTheme}>
      <Slot />
    </ThemeProvider>
  );
}