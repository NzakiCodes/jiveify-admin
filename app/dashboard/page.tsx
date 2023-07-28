"use client";
import Link from "next/link";

import { Fragment, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Topbar from "@/components/topbar";
import { axiosAuth } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import PodcastCard from "@/components/podcast-card";
import { Metrics, Podcast } from "@/types";
import { HeadphonesIcon, Users2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Chart from "./chart";

const fetchMetrics = (): Promise<Metrics> =>
  axiosAuth.get("/admin/metrics").then((response) => response.data);

export default function Page() {
  const metricsQuery = useQuery(["fetch-metrics"], fetchMetrics);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Topbar title="Dashboard" />
      <div className="my-7 py-8">
        <div className="border border-gray-800 rounded-lg mx-4 py-6 lg:mx-8 my-4">
          <div className=" px-4 py-6 lg:px-8 my-4">
            <span className="py-1">Active users right now</span>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-3 my-2 py-2">
              <div className="lg:col-span-2 ">
                <Card className=" py-4 border-none">
                  <CardContent className="py-3">
                    <div className="text-5xl font-bold">
                      {metricsQuery.data?.podcasters}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Podcasters in total
                    </p>
                  </CardContent>
                </Card>
                <Card className=" py-4 border-none">
                  <CardContent className="py-3">
                    <div className="text-5xl font-bold">
                      {metricsQuery.data?.podcasters}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Graph showing Active Users per day
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-3">
                <Chart
                  data={[
                    {
                      name: "Male",
                      total: metricsQuery.data?.male
                        ? metricsQuery.data?.male
                        : 0,
                    },
                    {
                      name: "Female",
                      total: metricsQuery.data?.male
                        ? metricsQuery.data?.female
                        : 0,
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className=" px-4 py-6 lg:px-8 my-4">
            {metricsQuery.isLoading && (
              <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:grid-cols-3 gap-x-10 my-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-28" />
                ))}
              </div>
            )}
            {metricsQuery.isFetched && (
              <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
                <Card>
                  <CardHeader className="flex flex-row items-center space-x-4 space-y-0 pb-2">
                    <div className="p-1 bg-purple-100 rounded-md">
                      <Users2Icon
                        className="stroke-purple-800 h-6 w-6"
                        strokeWidth={1}
                      />
                    </div>
                    <CardTitle className="text-base font-bold font-heading">
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-bold">
                      {metricsQuery.data?.totalUsers}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center space-x-4 space-y-0 pb-2">
                    <div className="p-1 bg-purple-100 rounded-md">
                      <HeadphonesIcon
                        className="stroke-purple-800 h-6 w-6"
                        strokeWidth={1}
                      />
                    </div>
                    <CardTitle className="text-base font-bold font-heading">
                      Published Podcasts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-bold">
                      {metricsQuery.data?.publishedPodcast}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center space-x-4 space-y-0 pb-2">
                    <div className="p-1 bg-purple-100 rounded-md">
                      <HeadphonesIcon
                        className="stroke-purple-800 h-6 w-6"
                        strokeWidth={1}
                      />
                    </div>
                    <CardTitle className="text-base font-bold font-heading">
                      Total Podcasters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-bold">
                      {metricsQuery.data?.podcasters}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
