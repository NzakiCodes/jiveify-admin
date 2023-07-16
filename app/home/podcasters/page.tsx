"use client";
import { Fragment } from "react";
import Topbar from "@/components/topbar";
import { axiosAuth } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Podcast, Podcaster, PodcasterReturn } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const fetchPodcasters = (data: any): Promise<PodcasterReturn> =>
  axiosAuth.post("/admin/podcasters", data).then((response) => response.data);

const InitialData: Podcaster[] = [{
  id: "985189288b68f91186b963e33505",
  fullname: "Arrik Tech",
  user_id: "c8b12effe3d27d173b590740abd1",
  status: "draft",
  title: "Let it out",
  description: "Advancing the intelligents",
  totalPodcast: "1",
  subscription: "null",
}];
export default function Page() {
  const podcastersQuery = useQuery(["podcasters"], () =>
    fetchPodcasters({
      page: null,
      limit: null,
      order: null,
    })
  );

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
            isLoading={podcastersQuery.isLoading}
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </Fragment>
  );
}
