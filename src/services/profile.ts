import { Supabase } from "@/lib/supabase";



export const getProfileById = async(id : string) => {
    const {data} = await Supabase
    .from("profiles")
    .select('*')
    .eq('id', id)
    .single()
    .throwOnError()

    return data;
}
