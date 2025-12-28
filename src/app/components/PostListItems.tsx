import {View , Text, Image, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Tables} from '@/types/database.types'
import { Link } from 'expo-router';
import { Supabase } from '@/lib/supabase';

dayjs.extend(relativeTime);


type PostWithUser = Tables<'post'> 
& {
   user : Tables<'profiles'>| null,
   replies: {
    count: number;
  }[];
};

export default function PostListItem({ post, isLastInGroup=true }: { post: PostWithUser , isLastInGroup? : Boolean}){
    return (
      <Link href= {`(home)/posts/${post.id}`} asChild>
        <Pressable className= {`flex-row p-4  ${isLastInGroup ? 'border-b border-gray-800/70' : " " } ` }> 
            {/*User Avatar*/}
                <View className='mr-3 items-center  gap-3'>
                    <Image
                     source={{ uri: post.user?.avatar_url || ''
                     }}
                    className='rounded-full w-12 h-12'
                    />
                    {!isLastInGroup  && 
                     <View
                      className='flex-1 w-[2px] rounded-full bg-neutral-700 translate-y-2'>
                        </View>}
                </View>
                 {/*content*/}
        <View className='flex-1'>
                <View className='flex-row items-center'>
                    <Text className='text-white font-bold mr-2'>
                        {post.user?.username}
                    </Text>

                    <Text className='text-gray-500'>
                        {dayjs(post.created_at).fromNow()}
                    </Text>

                </View>

                <Text className='text-white mt-2 mb-3'>
                    {post.content}
                </Text>


                {post.images &&  (
                  <View className='flex-row gap-2 mt-2'>
                  {post.images.map((image) => (
                    <Image  className='w-full aspect-[4/3] rounded-lg'
                    key={image}
                    source={{uri : Supabase.storage.from('media').getPublicUrl(image).data.publicUrl }} />
                  ))}
                  </View>
                ) }

                {/* Interaction Buttons */}
        <View className='flex-row gap-4 mt-2'>
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
