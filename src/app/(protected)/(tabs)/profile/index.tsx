import { ActivityIndicator, FlatList, Text , View } from "react-native";
import { Supabase } from '@/lib/supabase';
import { useAuth } from "@/providers/AuthProvider";
import {  useQuery } from "@tanstack/react-query";
import {getPostByUserId } from "@/services/post";
import PostListItem from "@/app/components/PostListItems";
import { getProfileById } from "@/services/profile";
import ProfileHeader from "@/app/components/ProfileHeader";
import { Link } from "expo-router";

export default function profile() {


     const {user}=  useAuth();

     const {data :profile ,isLoading, error} = useQuery({
        queryKey : ['post', {user_id : user?.id}],
        queryFn : ()=>  getPostByUserId(user!.id),
     }) 


     const {data : userData}= useQuery({
        queryKey : ['Post' , user?.id ],
        queryFn : ()=>getProfileById(user!.id)

     })


     if (isLoading){
        <ActivityIndicator />
     }

     if (error){
        console.error(`{error.message}`)
     }


    return (
      
        <View className="flex-1 justify-center">
                <FlatList 
                data={profile}
                renderItem={({item}) => <PostListItem post={item} />}
                ListHeaderComponent={
                <>
                <ProfileHeader />
                <Text className="text-white text-lg font-bold mt-4 pl-9">Your posts</Text>
                <View className="mt-2 border-b h-2 border-neutral-800">
                </View>
                </>
            }
                  />
            {/* <Text onPress={()=> Supabase.auth.signOut()}  className="text-white text-3xl text-center font-bold">
                Sign Out
            </Text> */}
        </View>
    )
}