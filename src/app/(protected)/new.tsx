import { View ,  Text , TextInput , Pressable , KeyboardAvoidingView, Platform, Alert , Image, ScrollView} from 'react-native';
import { use, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Supabase } from '@/lib/supabase';
import {useAuth} from '@/providers/AuthProvider'
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';




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


    const [image , setImage] = useState<string | null>(null);

    const queryClient = useQueryClient();

    // Add this at the top with your other states
    const [aspectRatio, setAspectRatio] = useState(1); // Default to 1 (square)


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

    const pickImage = async() =>{

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);

        const width = result.assets[0].width;
        const height = result.assets[0].height;
        setAspectRatio(width / height);
        }
}

    return(
        <SafeAreaView  edges={['bottom']}  className='flex-1 p-4'>
            <KeyboardAvoidingView className='flex-1'
            behavior={Platform.OS === 'ios' ? 'padding'  : undefined}
            keyboardVerticalOffset={Platform.OS ==='ios' ? 100 :100 }
           
            >

            <ScrollView 
                    className='flex-1' 
                    contentContainerClassName="pb-20" // Padding so content isn't hidden behind button
                    keyboardShouldPersistTaps="handled"
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

        <View className='py-4 px-2'>
        {image && 
        (  <Pressable onPress={pickImage}>
             <Image 
            source={{ uri: image }}  
        style={{ aspectRatio: aspectRatio }} 
        className='w-full  rounded-lg mt-2' 
        resizeMode ="contain"/></Pressable> )  }

        <View className='pt-3'></View>
        <Entypo onPress= {pickImage}  name="images" size={20} color="gray" />
        </View>
    </ScrollView>
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