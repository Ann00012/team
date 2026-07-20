import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import UserDetailsClient from "./UserDetailsClient";
import { fetchSingleUser } from "@/services/api";

type Props = {
    params: Promise<{ id: string }>
}

const UserDetails = async ({ params }: Props) => { 
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["user", id],
        queryFn:()=>fetchSingleUser(id)
    })
    return (
         <HydrationBoundary state={dehydrate(queryClient)}>
      <UserDetailsClient />
    </HydrationBoundary>
    )
}


export default UserDetails;