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

