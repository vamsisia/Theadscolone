import { Stack } from "expo-router"

export default function ProtectedLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
      
      {/* 1. Keep the Tabs (index) header hidden */}
      {/* (This happens automatically because of screenOptions above) */}
      <Stack.Screen name="(tabs)" />
      {/* 2. FORCE the header to show for the 'new' screen */}
      <Stack.Screen 
        name="new" 
        options={{ 
          headerShown: true, 
          presentation:'modal',
          animation:'slide_from_bottom',
          title: 'New Post' 
        }} 
      />

    </Stack>
    )

}