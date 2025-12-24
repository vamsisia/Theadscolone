
import { ActivityIndicator, FlatList, Text} from 'react-native';
import PostListItem from '@/app/components/PostListItems';
import {Link} from 'expo-router';
import { Supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async() => {
  const {data} = await Supabase
  .from('post')
  .select("*, user:profiles(*)")
  .throwOnError();
  return data;
}


export default function HomeScreen() {
  
  const  {data :posts, error, isLoading} = useQuery(
    {
        queryKey : ['posts'],
        queryFn :fetchPosts,
    
      },)

    //const [posts, setPosts] = useState<Post[]>([]);

 // console.log(JSON.stringify(posts, null, 2));


 if(isLoading){
  return <ActivityIndicator/>
 }

 if(error){

  return <Text className='text-red-500'>
   {error.message}
  </Text>

 }

  return (
    <FlatList
       data = {posts}
       renderItem={({item}) => <PostListItem post={item} />}
    />
  );
}