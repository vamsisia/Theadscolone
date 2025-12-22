
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import {View, ActivityIndicator} from 'react-native';

export default function ProtectedLayout() {

  const {isAuthenticated, isLoading}  =useAuth();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  // 2. Once loading is done, THEN check if we should kick them out.
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Authenticated users see the protected stack (tabs, new post, etc.)
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='new'
        options={{
          title: 'New Thread',
          presentation: 'modal',
          // animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}