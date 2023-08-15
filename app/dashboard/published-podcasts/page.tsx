"use client";
import Link from "next/link";

import { Fragment, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Topbar from "@/components/topbar";
import { axiosAuth } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import PodcastCard from "@/components/podcast-card";
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

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Topbar />
      <div>
        <div className=" px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                All Published Podcasts
              </h2>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            {/* <ScrollArea> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
              {popularPodcastQuery.isLoading &&
                Array.from({ length: 12 }).map((_, idx) => (
                  <PodcastCard.Skelecton
                    key={idx}
                    className="w-[250px] h-[330px]"
                  />
                ))}
              {popularPodcastQuery.isSuccess &&
                popularPodcastQuery.data.map((podcast) => (
                  <PodcastCard
                    key={podcast.id}
                    podcast={podcast}
                    className="w-[250px]"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                ))}
            </div>
            {/* <ScrollBar orientation="horizontal" />
            </ScrollArea> */}
          </div>
        </div>
        {/* <div className=" px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="lg:text-2xl font-semibold tracking-tight">
                Your recent viewed podcasts
              </h2>
           
            </div>
            <Link href={"/"} className="text-sm">
              See All
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {recentViewedPodcastQuery.isLoading &&
                  [1, 2, 3, 4].map((p) => (
                    <PodcastCard.Skelecton
                      key={p}
                      className="w-[250px] h-[250px]"
                    />
                  ))}
                {recentViewedPodcastQuery.isSuccess &&
                  recentViewedPodcastQuery.data.map((podcast) => (
                    <PodcastCard
                      key={podcast.id}
                      podcast={podcast}
                      className="w-[250px]"
                      aspectRatio="square"
                      width={250}
                      height={330}
                    />
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
}
