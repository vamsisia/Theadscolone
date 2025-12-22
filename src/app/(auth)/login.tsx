import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /*
  // 1. Get the status
  const { isAuthenticated } = useAuth();

  console.log("LOGIN SCREEN STATUS -> isAuthenticated:", isAuthenticated);
  // 2. THE WATCHER: This is the ONLY thing that should move you.
  // It waits for the "Bouncer" to officially say "True".
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(protected)/(tabs)');
    }
  }, [isAuthenticated]); */

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    try {
      const { data, error } = await Supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        setLoading(false); // Stop loading if error
        return;
      }

      // 3. CRITICAL FIX: DO NOT NAVIGATE HERE!
      // We do NOTHING. We just wait. 
      // The 'useEffect' above will see the change and move us automatically.
      
    } catch (err) {
      console.error('Unexpected error during login:', err);
      Alert.alert('Login Failed', 'Unexpected error. Please try again.');
      setLoading(false);
    }
    // Note: We don't set loading(false) on success, 
    // because we want the button to stay "Signing in..." while we redirect.
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-black"
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <Text className="text-white text-4xl font-bold mb-2">Welcome back</Text>
          <Text className="text-gray-400 text-base">Sign in to continue</Text>
        </View>

        <View>
          <View className="mb-4">
            <Text className="text-gray-300 text-sm mb-2 font-medium">Email</Text>
            <TextInput
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-base"
              placeholder="Enter your email"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-300 text-sm mb-2 font-medium">Password</Text>
            <TextInput
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-base"
              placeholder="Enter your password"
              placeholderTextColor="#6b7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className={`bg-white rounded-lg py-4 items-center ${loading ? 'opacity-50' : ''}`}
          >
            <Text className="text-black font-semibold text-base">
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
          </Pressable>
        </View>

        <View className="mt-6 items-center">
          <Text className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Text className="text-white font-semibold underline">Create one</Text>
              </Pressable>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}