import { View ,  Text , TextInput , Pressable , KeyboardAvoidingView, Platform} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NewPostScreeen(){

    const [text , setText]  = useState('');


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
            onPress={ ()=> console.log({text})}
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