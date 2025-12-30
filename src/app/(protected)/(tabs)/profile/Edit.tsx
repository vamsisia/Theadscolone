import { useAuth } from "@/providers/AuthProvider";
import { getProfileById } from "@/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, Text, TextInput, View  , Platform , Image} from "react-native";
import {UpdateUserData} from "@/services/post";
import { router } from "expo-router";
import UserAvatarPicker from "@/app/components/UserAvatarPicker";



export default function EditProfile(){
    const {user}  =useAuth();

    const queryClient = useQueryClient()

    const [name, setname] = useState('');
    const [Bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    
    const {data : userData}= useQuery({
        queryKey : ['Post' , user?.id ],
        queryFn : ()=>getProfileById(user!.id),
        
     }
    )


     useEffect( () => {
        setname(userData?.full_name || "")
        setBio(userData?.bio || "")
        setAvatarUrl(userData?.avatar_url || '');

     } , [userData?.id] )


     const {mutate , isPending } = useMutation({
        mutationFn : ()=> UpdateUserData({bio :Bio , id: user!.id , full_name:name , avatar_url: avatarUrl}),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ['profile', user?.id],})
            queryClient.invalidateQueries({queryKey : ['post']})

            router.back()
        }
     })

     console.log(avatarUrl);

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' :'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
        style =  {{ flex : 1 }}
         >
        <View className="flex-1  p-4 gap-4">
            <UserAvatarPicker currentAvatar= {avatarUrl}  onUpload={setAvatarUrl} />

            <TextInput
            value={name}
            onChangeText={setname}
            className="border-2 border-neutral-700 rounded-md p-4 text-white"
            placeholder="Enter name....."
            placeholderTextColor='gray'
            />
            <TextInput
            value={Bio}
            onChangeText={setBio}
            className="border-2 border-neutral-700 rounded-md p-4 text-white"
            placeholder="Enter bio"
            placeholderTextColor='gray'
            multiline
            />

        <View className='mt-auto'>
        <Pressable
            onPress={()=>{
                 mutate()
                }}
            className= {`${isPending || !avatarUrl ? 'bg-white/50 ' :'bg-white' }  p-3 mr-3 px-6 rounded-full items-center` }
            disabled=  { isPending  || !avatarUrl}
            >
            <Text className='text-black font-bold'>
                save
            </Text>
        </Pressable>
        </View>
        </View>
        </KeyboardAvoidingView>
    )
}