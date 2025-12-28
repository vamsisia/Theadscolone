import { useAuth } from "@/providers/AuthProvider";
import { getProfileById } from "@/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import {UpdateUserData} from "@/services/post";


export default function EditProfile(){
    const {user}  =useAuth();

    const queryClient = useQueryClient()

    const [name, setname] = useState('');
    const [Bio, setBio] = useState('');

    
    const {data : userData}= useQuery({
        queryKey : ['Post' , user?.id ],
        queryFn : ()=>getProfileById(user!.id),
        
     }
    )


     useEffect( () => {
        setname(userData?.full_name || "")
        setBio(userData?.bio || "")

     } , [userData?.id])



     const {mutate , isPending , isError} = useMutation({
        mutationFn : ()=> UpdateUserData({bio :Bio , id: user!.id , full_name:name }),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey :['post', {user_id : user?.id}]})
        }
     })

    

    return (
        <View className="flex-1 p-4 gap-4">
            <TextInput
            value={name}
            onChangeText={()=> setname(name)}
            className="border-2 border-neutral-700 rounded-md p-4 text-white"
            placeholder="Enter name....."
            placeholderTextColor='gray'
            />
            <TextInput
            value={Bio}
            onChangeText={() => setBio(Bio)}
            className="border-2 border-neutral-700 rounded-md p-4 text-white"
            placeholder="Enter bio"
            placeholderTextColor='gray'
            multiline
            />

        <View className='mt-auto'>
        <Pressable
            onPress={()=>{mutate()}}
            className= {`${isPending ? 'bg-white/50 ' :'bg-white' } bg-white self-end p-3 mr-3  px-6 rounded-full` }
            disabled=  { isPending }
            >
            <Text className='text-black font-bold'>
                save
            </Text>
        </Pressable>
        </View>
        </View>
    )
}