"use client";
import PodcastCard from "@/components/podcast-card";
import Topbar from "@/components/topbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { axiosAuth } from "@/config/axios";
import { Podcast } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";

const fetchMyPodcasts = (data: any): Promise<Podcast[]> =>
  axiosAuth.post("/podcast/my-podcast", data).then((response) => response.data.items);

function Page() {
  const fetchMyPodcastsQuery = useQuery(["my-podcasts"], ()=>fetchMyPodcasts({
    "type": "all",
    "page": null,
    "limit": null,
    "order": null,
  }));
  const fetchMyDraftPodcastsQuery = useQuery(["my-podcasts-drafts"], () =>
    fetchMyPodcasts({
      "type": "draft",
      "page": null,
      "limit": null,
      "order": null,
    })
  );
  // useEffect(() => {
  //   if (!fetchMyDraftPodcastsQuery.isLoading) {
  //     console.log(fetchMyDraftPodcastsQuery);
  //   }
  // }, [fetchMyDraftPodcastsQuery.isLoading]);

  return (
    <Fragment>
      <Topbar />
      <div>
        <div className=" px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                My Podcasts
              </h2>
              <p className="text-sm text-muted-foreground">
                Podcasts Created By You.
              </p>
            </div>
            <Link href={"/"}>See All</Link>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {fetchMyPodcastsQuery.isLoading &&
                  [1, 2, 3, 4, 5].map((p) => (
                    <PodcastCard.Skelecton
                      key={p}
                      className="w-[250px] h-[330px]"
                    />
                  ))}
                {fetchMyPodcastsQuery.isSuccess &&
                  fetchMyPodcastsQuery.data.map((podcast) => (
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
        <div className=" px-4 py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="lg:text-2xl font-semibold tracking-tight">
                Drafts (Unpublished) Podcasts
              </h2>
              {/* <p className="text-sm text-muted-foreground">
                    Top picks for you. Updated daily.
                  </p> */}
            </div>
            <Link href={"/"} className="text-sm">
              See All
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {fetchMyDraftPodcastsQuery.isLoading &&
                  [1, 2, 3, 4].map((p) => (
                    <PodcastCard.Skelecton
                      key={p}
                      className="w-[250px] h-[250px]"
                    />
                  ))}
                {fetchMyDraftPodcastsQuery.isSuccess &&
                  fetchMyDraftPodcastsQuery.data.map((podcast) => (
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
        </div>
      </div>
    </Fragment>
  );
}

export default Page;
