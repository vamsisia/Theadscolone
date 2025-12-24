import { View ,  Text , TextInput , Pressable , KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { use, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Supabase } from '@/lib/supabase';
import {useAuth} from '@/providers/AuthProvider'
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { router } from 'expo-router';



const createPost = async(content : string , user_id:string)=> {
    const {data} = await Supabase
    .from('post')
    .insert({content , user_id })
    .select("*")
    .throwOnError();
    return data;

}


export default function NewPostScreeen(){

    const [text , setText]  = useState('');
    const  {user} = useAuth();


    const queryClient = useQueryClient();

   const {mutate , isPending , error} = useMutation({
        mutationFn: ()=> createPost(text, user!.id),
        onSuccess : () => {
            setText('');
            router.back();
            queryClient.invalidateQueries({queryKey : ['posts']});
            
        },
        onError:(error) =>{
            console.error(error.message);
        }
    })
    
    /*
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

    */
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
        {error && <Text className='text-red-500 text-sm'>{error.message}</Text>}
        <View className='mt-auto'>
        <Pressable 
            onPress={()=>{mutate()}}
            className= {`${isPending ? 'bg-white/50 ' :'bg-white' } bg-white self-end p-3 mr-3  px-6 rounded-full` }
            disabled=  { isPending }
            >

            <Text className='text-black font-bold'>
                post
            </Text>
        </Pressable>
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>

            
    );
}