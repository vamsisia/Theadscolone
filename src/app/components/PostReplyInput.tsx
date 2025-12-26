import { View ,TextInput } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { useAuth} from '@/providers/AuthProvider';
import {useMutation , useQueryClient } from '@tanstack/react-query';
import { createPost } from "@/services/post"; 




type PostReplyInputProp ={
    post_id : string;
}

export default function PostReplyInput( {post_id} : PostReplyInputProp ){
    const [text , setText] = useState('');


    
    const  {user} = useAuth();


     const queryClient = useQueryClient();

   const {mutate , isPending , error} = useMutation({
        mutationFn: ()=> createPost({content:text ,user_id : user!.id , parent_id : post_id} ),
        onSuccess : () => {
            setText('');
            queryClient.invalidateQueries({queryKey : ['post', post_id, 'replies']});
            
        },
        onError:(error) =>{
            console.error(error.message);
        }
    })


    return (
        <View className="p-4">
            <View className="bg-gray-800 p-2 flex-row rounded-xl items-center">
                <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Add to threads ..."
                className="bg-gray-800 flex-1 text-white"
                multiline

                />
                <AntDesign 
                onPress={()=> mutate()} 
                disabled={isPending || text.length ===0}    
                name="plus-circle" size={24} 
                color={text.length ===0 ?  "gray" : "gainsboro" } />
            </View>
        </View>
    )
}