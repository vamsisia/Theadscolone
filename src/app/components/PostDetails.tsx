import {View , Text, Image, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Tables} from '@/types/database.types'
import { Link } from 'expo-router';

dayjs.extend(relativeTime);


type PostWithUser = Tables<'post'> 
& {
   user : Tables<'profiles'>| null,
   replies: {
    count: number;
  }[];
};

export default function PostDetails({ post }: { post: PostWithUser}){
    return (
      <Link href= {`(home)/posts/${post.id}`} asChild>
        <Pressable className=' p-4 border-b border-gray-800/70'> 
            {/*User Avatar*/}
                <View className='flex-1 flex-row items-center gap-3'>
                    <Image
                     source={{ uri: post.user?.avatar_url || ''
                     }}
                    className='rounded-full w-12 h-12'
                    />

                   {/*User info*/}
                    
                    <Text className='text-white font-bold mr-2'>
                        {post.user?.username}
                    </Text>

                    <Text className='text-gray-500'>
                        {dayjs(post.created_at).fromNow()}
                    </Text>

                </View>
            
                 {/*content*/}
        <View className='flex-1 '>
                <Text className='text-white mt-2 mb-2'>
                    {post.content}
                </Text>

                {/* Interaction Buttons */}
        <View className='flex-row gap-4'>
          <Pressable className='flex-row items-center'>
            <Ionicons name='heart-outline' size={20} color='#d1d5db' />
            <Text className='text-gray-300 ml-2'>0</Text>
          </Pressable>

          <Pressable className='flex-row items-center'>
            <Ionicons name='chatbubble-outline' size={20} color='#d1d5db' />
            <Text className='text-gray-300 ml-2'>{post?.replies?.[0].count || 0}</Text>
          </Pressable>

          <Pressable className='flex-row items-center'>
            <Ionicons name='repeat-outline' size={20} color='#d1d5db' />
            <Text className='text-gray-300 ml-2'>0</Text>
          </Pressable>

          <Pressable>
            <Ionicons name='paper-plane-outline' size={20} color='#d1d5db' />
          </Pressable>
        </View>
      </View>
    </Pressable>
    </Link>
  );
}
