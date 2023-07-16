import { Fragment } from "react";
import Topbar from "@/components/topbar";
import { axiosAuth } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Podcast } from "@/types";

const fetchPopularPodcasts = (): Promise<Podcast[]> =>
  axiosAuth.get("/podcast/popular").then((response) => response.data);

const fetchRecentViewedPodcasts = (): Promise<Podcast[]> =>
  axiosAuth.get("/podcast/recent").then((response) => response.data);

export default function Page() {
  const popularPodcastQuery = useQuery(
    ["popular-podcast"],
    fetchPopularPodcasts
  );

  const recentViewedPodcastQuery = useQuery(
    ["recent-viewed-podcast"],
    fetchRecentViewedPodcasts
  );

  return (
    <Fragment>
      <Topbar/>
      <div>
        <div className=" px-4 py-6 lg:px-8"></div>
      </div>
    </Fragment>
  );
}
