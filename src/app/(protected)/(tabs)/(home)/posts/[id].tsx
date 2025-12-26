import PostListItem from '@/app/components/PostListItems';
import { Supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList } from 'react-native';
import {View, Text} from 'react-native';
import PostReplyInput from '@/app/components/PostReplyInput';



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
            staleTime :1000 * 60 *5
        },
        
    );


    if(isLoading){
        return<ActivityIndicator />
    }

    if(error || !data) {
        return <Text className='text-red-600' >Post not found</Text>
    }

    return (
        <View className='flex-1 bg-neutral-900'>
            <FlatList
               data={[]}
               renderItem={({item}) => <PostListItem post={item} />}
               ListHeaderComponent={<PostListItem post={data} />}
               
            />
            <PostReplyInput  post_id = {id} />
        </View>
    )
}