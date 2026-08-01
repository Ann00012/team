import axios from "axios";
import { User } from './types';

interface Post { 
    id: number,
    userId: number,
    title: string,
    body: string,
    tags: string[],
    reactions: Reactions,
    views:number
}

interface Reactions { 
    likes: number,
    dislikes:number
}
interface UserPosts { 
    posts: Post[],
     total: number;
    skip: number;
    limit: number;
    
}
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}


interface Response {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

interface UserTodos { 
    todos: Todo[],
    total: number;
    skip: number;
    limit: number;
}

const api = axios.create({
  baseURL: "https://dummyjson.com",
});


export const fetchUsers = async ({
  page,
  search,
  sortBy,
  order,
}: {
  page: number;
  search: string;
  sortBy?: string;
  order?: string;
}) => {
  const limit = 6;
  const skip = (page - 1) * limit;

  let endpoint = search
    ? `/users/search?q=${search}&limit=${limit}&skip=${skip}`
    : `/users?limit=${limit}&skip=${skip}`;

  if (sortBy) {
    endpoint += `&sortBy=${sortBy}&order=${order || "asc"}`;
  }

  const { data } = await api.get(endpoint);

  return data;
};

export const fetchSingleUser = async (id: string): Promise<User> => {
    const res = await axios.get<User>(`https://dummyjson.com/users/${id}`);
    return res.data
};

export const fetchUserTodos = async (id: string): Promise<UserTodos> => { 
    const res = await axios.get<UserTodos>(`https://dummyjson.com/users/${id}/todos`);
    return res.data;
};

export const fetchUserPosts = async (id: string): Promise<UserPosts> => {
    const res = await axios.get<UserPosts>(`https://dummyjson.com/users/${id}/posts`);
    return res.data;
};

export const deleteUser = async (id: number): Promise<User> => {
    const res = await axios.delete<User>(`https://dummyjson.com/users/${id}`);
    return res.data
};
 
export const loginUser = async (
  username: string,
  password: string
) => {
  const res = await axios.post(
    "https://dummyjson.com/user/login",
    {
      username,
      password,
      expiresInMins: 30,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};


export const addNewUser = async (username:string,lastName:string,firstName:string,img?:string,role?:string) => {
    const res = await axios.post(`https://dummyjson.com/users/add`,
        {
            username,  lastName, firstName, img,role,
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    return  res.data;
};
 
export const updateUser = async (id: number, username?: string, firstName?: string, lastName?: string, role?: string) => {
    const res = await axios.patch(`https://dummyjson.com/users/${id}`,
        {
            username, firstName, lastName, role
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    return res.data
};

