import PostListItem from '@/app/components/PostListItems';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList } from 'react-native';
import {View, Text , KeyboardAvoidingView , Platform} from 'react-native';
import PostReplyInput from '@/app/components/PostReplyInput';
import {getPostById , getPostByReplies} from '@/services/post' 
import PostDetails from '@/app/components/PostDetails';



export default function postdetails(){
    const  {id} = useLocalSearchParams<{id : string}>();

    const {data : post , isLoading , error } = useQuery(
        {
            queryKey : ['post', id],
            queryFn : () =>getPostById(id),
            staleTime : 1000 * 60 * 5,
        },
        
    );

    
    const {data : parent}  = useQuery(
        {
            queryKey : ['Post' , id,  'parent' ],
            queryFn : ()=> getPostById(post?.parent_id || ''),
            enabled : !! post?.parent_id 
        }
    )

    const {data :replies}  =  useQuery(
        {
            queryKey : ['post', id, 'replies'],
            queryFn : ()=>getPostByReplies(id),
        }
    );


    if(isLoading){
        return<ActivityIndicator />
    }

    if(error || !post) {
        return <Text className='text-red-600' >Post not found : {error?.message} </Text>
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
        style={{ flex: 1 }}
    >
        <View className='flex-1 bg-neutral-900'>
            <FlatList
               data={ replies || []}
               renderItem={({item}) => <PostListItem post={item} />}
               ListHeaderComponent={
                <>
                {parent && <PostListItem post={parent}  isLastInGroup={false}/> }
               <PostDetails post={post} />
               <Text className='text-white p-4 font-bold text-lg  border-b  border-neutral-900'>
                Replies
               </Text>
               </>
               
               }
               
            />
            <PostReplyInput  post_id = {id} />
        </View>

        </KeyboardAvoidingView>
    )
}