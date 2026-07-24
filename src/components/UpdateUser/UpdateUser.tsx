import { updateUser } from "@/services/api";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";

interface UpdateUserProps {
    id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export default function UpdateUsera() { 
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: ({ id, username, firstName, lastName, role }:UpdateUserProps) => updateUser(id, username, firstName, lastName, role),
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["users"] }),
                toast.success("Update user!")
        },
        onError: () => { 
            toast.error("Error")
        }
    });
}