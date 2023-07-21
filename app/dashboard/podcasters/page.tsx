"use client";
import { Fragment } from "react";
import Topbar from "@/components/topbar";
import { axiosAuth } from "@/config/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Podcaster, PodcasterReturn } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

const fetchPodcasters = (data: any): Promise<PodcasterReturn> =>
  axiosAuth.post("/admin/podcasters", data).then((response) => response.data);

const deletePodcater = (podcaterId: string) => {
  console.log(podcaterId);
  return axiosAuth.delete(`/admin/podcaster/delete/${podcaterId}`);
};

const InitialData: Podcaster[] = [
  {
    id: "985189288b68f91186b963e33505",
    fullname: "Arrik Tech",
    user_id: "c8b12effe3d27d173b590740abd1",
    status: "draft",
    title: "Let it out",
    description: "Advancing the intelligents",
    totalPodcast: "1",
    subscription: "null",
  },
];
export default function Page() {
  const podcastersQuery = useQuery(["podcasters"], () =>
    fetchPodcasters({
      page: null,
      limit: null,
      order: null,
    })
  );

  const onDeleteSuccess = (res: AxiosResponse<{ message: string }, any>) => {
    podcastersQuery.refetch();
    toast({
      description: (
        <div className="flex gap-x-1">
          <CheckCircle className="mr-1" /> {res.data.message}
        </div>
      ),
      className: "bg-green-100 text-green-600",
    });
  };
  const deletePodcaterMutation = useMutation({
    mutationKey: ["delete-podcaster"],
    mutationFn: (podcaterId: string) => deletePodcater(podcaterId),
    onSuccess: onDeleteSuccess,
  });

  const deletePodcaster = (podcasterId: string) => {
    toast({
      title: "Delete Podcaster",
      description: "Do you really want to Delete Podcaster?'",
      action: (
        <ToastAction
          onClick={() => deletePodcaterMutation.mutate(podcasterId)}
          altText="Delete"
        >
          Delete
        </ToastAction>
      ),
      variant:"destructive",
      duration:5000
    });
  };

  const data: Podcaster[] = podcastersQuery.data
    ? podcastersQuery.data?.items.map(
        (data, idx): Podcaster => ({
          id: data.id,
          fullname: data.fullname,
          user_id: data.user_id,
          status: data.status,
          title: data.title,
          description: data.description,
          totalPodcast: data.totalPodcast,
          subscription: data.subscription?.subscription_plan,
        })
      )
    : InitialData;

  return (
    <Fragment>
      <Topbar />
      <div>
        <div className="mt-10 py-10 px-4 lg:px-8">
          <DataTable
            isLoading={
              podcastersQuery.isLoading || deletePodcaterMutation.isLoading
            }
            columns={columns}
            data={data}
            onDelete={deletePodcaster}
          />
        </div>
      </div>
    </Fragment>
  );
}
