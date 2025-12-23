
import { FlatList, Text, View } from 'react-native';
import { dummyPosts } from '@/dummyData';
import PostListItem from '@/app/components/PostListItems';
import {Link} from 'expo-router';
import { useEffect, useState } from 'react';
import {Post} from '@/types'
import { Supabase } from '@/lib/supabase';

export default function HomeScreen() {

  const [posts, setPosts]  = useState<Post[]>([]); 


  useEffect( () => {
    const fetchPosts = async()=> {
      const {data, error} = await  Supabase.from('post').select('*  , user:profiles(*)');

      if(error) {
        console.error(error);
      }
      setPosts(data as Post[]);
    };
    fetchPosts();

  }, []);


  console.log(JSON.stringify(posts, null, 2));

  return (
    <FlatList
       data = {posts}
       renderItem={({item}) => <PostListItem post={item} />}
       ListHeaderComponent={() => (
         <Link href='/new' className='text-blue-500 p-4 text-center text-3xl'>New Post</Link>
        
       )}
    />
  );
}