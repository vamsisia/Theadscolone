import { View ,  Text , TextInput , Pressable , KeyboardAvoidingView, Platform} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Supabase } from '@/lib/supabase';
import {useAuth} from '@/providers/AuthProvider'

export default function NewPostScreeen(){

    const [text , setText]  = useState('');
    const  {user} = useAuth();
    
    const submit = async ()=>{
        if(!user || !text) {
            return;
        }
        const {data, error} =await Supabase.from('post').insert({content : text , user_id : user.id })


        if(error){
            console.error(error);
        }

        setText('');
    }

    return(

        <SafeAreaView  edges={['bottom']}  className='flex-1 p-4'>
            <KeyboardAvoidingView className='flex-1'
            behavior={Platform.OS === 'ios' ? 'padding'  : 'height'}
            >
            <Text className='text-white font-bold text-lg'>Username</Text>
    
        <TextInput 
            value={text}
            onChangeText={setText}
            className='text-white'
            multiline
            numberOfLines={4}
            placeholderTextColor="#888"
            placeholder='Whats is on your mind ?'
        />
        <View className='mt-auto'>
        <Pressable 
            onPress={submit}
        className='bg-white self-end p-3 mr-3  px-6 rounded-full'>
            <Text className='text-black font-bold'>
                post
            </Text>
        </Pressable>
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>

            
    );
}