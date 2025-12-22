import { Text , View } from "react-native";
import { Supabase } from '@/lib/supabase';

export default function profile() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text onPress={()=> Supabase.auth.signOut()}  className="text-white text-3xl text-center font-bold">
                Sign Out
            </Text>
        </View>
    )
}