import {View, Text, Image, Pressable} from 'react-native'
import {getProfileById} from '@/services/profile'
import { useAuth } from '@/providers/AuthProvider'
import {useQuery } from '@tanstack/react-query'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Link } from 'expo-router'


export default function ProfileHeader(){
     const{user}  = useAuth();
    const {data : profilesInfo}  = useQuery({

        queryKey : ['post', user?.id],
        queryFn : () => getProfileById(user!.id)

     })
    return (
        <View className='p-4 gap-4'>
        <View className='flex-row justify-between gap-2'>
        <View className='gap-1'>
              <Text className='text-white text-2xl font-bold '>
                {profilesInfo?.full_name}
            </Text>
            
            <Text className='text-neutral-200 text-lg'>
                {profilesInfo?.username}
            </Text>
        </View>


        <View>
    {profilesInfo?.avatar_url ? (
      // 1. If URL exists, show Image
      <Image 
        source={{ uri: profilesInfo.avatar_url }} 
        className="w-20 h-20 rounded-full" 
      />
        ) : (
        <FontAwesome5 name="user-circle" size={30} color="gray" /> 
        )}
            </View>
        </View>
        <Text className='text-neutral-200 leading-snug'>{profilesInfo?.bio}</Text>


        <View className='flex-row gap-2'>
            <Link href='/profile/Edit' asChild >
            <Pressable className='flex-1 py-2 rounded-full bg-neutral-800'>
                <Text className='text-center text-neutral-200'>Edit Profile</Text>
            </Pressable>
            </Link>

            <Pressable className='flex-1 py-2 rounded-full bg-neutral-800'>
                <Text className='text-center text-neutral-200'>Share Profile</Text>
            </Pressable>
        </View>
    </View>
    )
    
}