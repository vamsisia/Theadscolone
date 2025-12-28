import { Supabase } from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";

export const fetchPosts = async() => {
    const {data} = await Supabase
    .from('post')
    .select("*,user:profiles(*) , replies : post(count)")
    .order("created_at", {ascending : false})
    .throwOnError();
    return data;
  }
  
type postTable = TablesInsert<'post'>;

export const createPost = async( post : postTable  )=> {
    const {data} = await Supabase
    .from('post')
    .insert(post)
    .select("*")
    .throwOnError();
    return data;
}
export const getPostById = async(id : string) => {
    const {data , error} = await Supabase
    .from("post")
    .select('*,user:profiles(*),replies:post(count)')
    .eq('id', id)
    .single()
    .throwOnError()
    return data;
}
export const getPostByUserId  = async(id : string) => {
    const {data , error} = await Supabase.from('post')
    .select('*, user:profiles(*), replies:post(count)')
    .eq("user_id",id)
    .order("created_at", {ascending : false})
    .throwOnError()
    return data;
}
export const getPostByReplies = async(id : string) => {
    const {data , error} = await Supabase
    .from("post")
    .select('*,user:profiles(*),  replies : post(count)' )
    .eq('parent_id ', id)
    .throwOnError()

    return data;
}
export const UpdateUserData = async (profileData : TablesInsert<"profiles">) => {
  const {data} =await Supabase
    .from("profiles")
    .update(profileData)
    .eq('id', profileData.id)
    .select('*')
    .single()
    .throwOnError()

    return data

} 