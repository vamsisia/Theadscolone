
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Supabase } from '@/lib/supabase';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await Supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Signup Error', error.message);
        console.error('Signup error:', error.message);
      } else if (data) {
        Alert.alert('Success', 'Account created successfully! Please check your email to verify your account.', [
          { text: 'OK', onPress: () => router.replace('/(auth)/login') }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-black"
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <Text className="text-white text-4xl font-bold mb-2">Create account</Text>
          <Text className="text-gray-400 text-base">Sign up to get started</Text>
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
              autoComplete="email"
              editable={!loading}
            />
          </View>

          
          <View className="mb-4">
            <Text className="text-gray-300 text-sm mb-2 font-medium">Password</Text>
            <TextInput
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-base"
              placeholder="Enter your password"
              placeholderTextColor="#6b7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              editable={!loading}
            />
          </View>

          
          <View className="mb-6">
            <Text className="text-gray-300 text-sm mb-2 font-medium">Confirm Password</Text>
            <TextInput
              className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-base"
              placeholder="Confirm your password"
              placeholderTextColor="#6b7280"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              editable={!loading}
            />
          </View>

          
          <Pressable
            onPress={handleSignup}
            disabled={loading}
            className={`bg-white rounded-lg py-4 items-center ${loading ? 'opacity-50' : ''}`}
          >
            <Text className="text-black font-semibold text-base">
              {loading ? 'Creating account...' : 'Create account'}
            </Text>
          </Pressable>
        </View>

        <View className='flex-row justify-center mt-4'>
            <Text className='text-gray-400'>Already have an account? </Text>
            <Link href='(auth)/login' asChild>
              <Pressable>
                <Text className='text-blue-400 font-medium'>Login in</Text>
              </Pressable>
            </Link>
          </View>
      </View>
    </KeyboardAvoidingView>
  );
}
