import { Supabase } from "@/lib/supabase";
import { TablesInsert } from "@/types/database.types";


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
    .select('*,user:profiles(*)' )
    .eq('id', id)
    .single()
    .throwOnError()

    return data;
}


export const getPostByReplies = async(id : string) => {
    const {data , error} = await Supabase
    .from("post")
    .select('*,user:profiles(*)' )
    .eq('parent_id', id)
    .throwOnError()

    return data;
}
