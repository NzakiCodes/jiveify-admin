"use client";
import { Fragment } from "react";
import Topbar from "@/components/topbar";
import { axiosAuth } from "@/config/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Podcaster, PodcasterReturn, User } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios, { AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

const fetchUsers = (): Promise<User[]> =>
  axiosAuth.get("https://test-jv.ygrehu.easypanel.host/admin/users").then((response) => response.data.items);

  const deleteUserAPI = (userId: string) => {
    console.log(userId);
    return axiosAuth.delete(`/admin/podcaster/delete/${userId}`);
  };

const InitialData: User[] = [
  {
    "id": "808cd14ee8a14f60b87c494f8142",
    "username": "--",
    "email": "--",
    "first_name": "--",
    "last_name": "--",
    "company_id": null,
    "admin_id": null,
    "role": "member",
    "address": null,
    "city": null,
    "country": null,
    "zip_code": null,
    "status": "1",
    "created_at": "2023-07-24 14:43:51",
    "updated_at": "2023-07-24 14:43:51",
    "gender": "male",
    "avatar": null,
    "subscribed": false
  }
];


export default function Page() {
  const usersQuery = useQuery(["users"], fetchUsers);
console.log(usersQuery.data)
  const onDeleteSuccess = (res: AxiosResponse<{ message: string }, any>) => {
    usersQuery.refetch();
    toast({
      description: (
        <div className="flex gap-x-1">
          <CheckCircle className="mr-1" /> {res.data.message}
        </div>
      ),
      className: "bg-green-100 text-green-600",
    });
  };

  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (userId: string) => deleteUserAPI(userId),
    onSuccess: onDeleteSuccess,
  });

  const deleteUser = (userId: string) => {
    toast({
      title: "Delete User",
      description: "Do you really want to Delete User?'",
      action: (
        <ToastAction
          onClick={() => deleteUserMutation.mutate(userId)}
          altText="Delete"
        >
          Delete
        </ToastAction>
      ),
      variant: "destructive",
      duration: 5000,
    });
  };

  const data: User[] = usersQuery.data
    ? usersQuery.data?.map(
        (data, idx): User => ({
         ...data
        })
      )
    : InitialData;

  return (
    <Fragment>
      <Topbar />
      <div>
        <div className="mt-10 py-10 px-4 lg:px-8">
          <DataTable
            isLoading={usersQuery.isLoading || deleteUserMutation.isLoading}
            columns={columns}
            data={data}
            onDelete={deleteUser}
          />
        </div>
      </div>
    </Fragment>
  );
}
