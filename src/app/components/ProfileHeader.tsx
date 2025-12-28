import {View, Text, Image} from 'react-native'
import {getProfileById} from '@/services/profile'
import { useAuth } from '@/providers/AuthProvider'
import {useQuery } from '@tanstack/react-query'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'


export default function ProfileHeader(){
     const{user}  = useAuth();
    const {data : profilesInfo}  = useQuery({

        queryKey : ['post', user?.id],
        queryFn : () => getProfileById(user!.id)

     })
    return (
        <View className='flex-row justify-between p-4'>
        <View>
              <Text className='text-white '>
                {profilesInfo?.full_name}
            </Text>
            
            <Text className='text-white'>
                {profilesInfo?.username}
            </Text>
        </View>


        <View>
    {profilesInfo?.avatar_url ? (
      // 1. If URL exists, show Image
      <Image 
        source={{ uri: profilesInfo.avatar_url }} 
        className="w-12 h-12 rounded-full" 
      />
        ) : (
        <FontAwesome5 name="user-circle" size={48} color="gray" /> 
        )}
    </View>

    </View>
    )
    
}