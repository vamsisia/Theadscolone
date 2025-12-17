export type User = {
    id : string;
    Username : string;
    name : string;
    image :string;
    bio : string;
}


export type Post = {
    id:string;
    create_at : string;
    content :string;
    user_id :string;
    user :User;
    parent_id :null | string;
    parent : Post | null;
    
    replies : [];
}