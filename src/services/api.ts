import axios from "axios";
import { User } from './types';

interface Response {
    users: User[];
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
}: {
  page: number;
  search: string;
}) => {
  const limit =6;
  const skip = (page - 1) * limit;

  const endpoint = search
    ? `/users/search?q=${search}&limit=${limit}&skip=${skip}`
    : `/users?limit=${limit}&skip=${skip}`;


  const { data } = await api.get(endpoint);

  return data;
};
