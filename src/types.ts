export type User = {
    id: string;
    image: string;
    username: string;
    name: string;
    bio: string;
    full_name: string ;   // Changed from 'name' to match console
    avatar_url: string;

     // Changed from 'image' to match console
  };
  
  export type Post = {
    id: string;
   created_at: string;
    content: string;
  
    user_id: string;
    user: User;
  
    parent_id: string | null;
    parent: Post | null;
  
    replies: Post[];
  };