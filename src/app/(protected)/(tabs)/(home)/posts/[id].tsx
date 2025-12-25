import PostListItem from '@/app/components/PostListItems';
import { Supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import {View, Text} from 'react-native';



const getPostById = async(id : string) => {
    const {data , error} = await Supabase
    .from("post")
    .select('*,user:profiles(*)' )
    .eq('id', id)
    .single()
    .throwOnError()

    return data;
}



export default function postdetails(){
    const  {id} = useLocalSearchParams<{id : string}>();


    const {data , isLoading , error } = useQuery(
        {
            queryKey : ['post', id],
            queryFn : () =>getPostById(id),


        }
    );


    if(isLoading){
        return<ActivityIndicator />
    }

    if(error || !data) {
        return <Text className='text-red-600' >Post not found</Text>
    }

    return (
        <View>
            <PostListItem post={data} />
        </View>
    )
}