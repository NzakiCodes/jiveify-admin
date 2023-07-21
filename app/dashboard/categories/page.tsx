"use client";
import Topbar from "@/components/topbar";
import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateCatogory } from "@/components/create-category";
import { axiosAuth } from "@/config/axios";
import { PodcastCategory } from "@/types";
import { CheckCircle } from "lucide-react";
import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import truncateString from "@/utils/truncateString";
import { Button } from "@/components/ui/button";

const fetchPodcastsCategory = (): Promise<PodcastCategory[]> =>
  axiosAuth.get("/podcast/categories").then((res) => res.data);

const deletePodcastsCategory = (podcastCategoryId: string) => {
  console.log(podcastCategoryId);
  return axiosAuth.delete(`podcast/category/${podcastCategoryId}`);
};
function Page() {
  const podcastCategoriesQuery = useQuery(
    ["podcast-category"],
    fetchPodcastsCategory
  );

  const onDeleteSuccess = (res: AxiosResponse<{ message: string }, any>) => {
    podcastCategoriesQuery.refetch();
    toast({
      description: (
        <div className="flex gap-x-1">
          <CheckCircle className="mr-1" /> {res.data.message}
        </div>
      ),
      className: "bg-green-100 text-green-600",
    });
  };
  const deletePodcastCategoryMutation = useMutation({
    mutationKey: ["delete-podcast-category"],
    mutationFn: (podcastCategoryId: string) =>
      deletePodcastsCategory(podcastCategoryId),
    onSuccess: onDeleteSuccess,
  });

  const deletePodcastCategory = (podcastCategoryId: string) => {
    toast({
      title: "Delete Category",
      description: "Do you really want to Delete Category?'",
      action: (
        <Button
          onClick={() =>
            deletePodcastCategoryMutation.mutate(podcastCategoryId)
          }
          variant={"destructive"}
          // altText="Delete"
        >
          Delete
        </Button>
      ),
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <Fragment>
      <Topbar />
      <div className="lg:p-8 mt-10 lg:mt-28">
        <div className=" py-10  rounded-lg border ">
          <div className="px-8 py-2 flex justify-between w-full">
            <div className="">
              <h1 className="text-3xl font-heading font-bold">Categories</h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Category List showing category counts.{" "}
              </p>
            </div>
            <div>
              <CreateCatogory />
            </div>
          </div>
          <div className="py-4">
            <Table className="px-4">
              {!podcastCategoriesQuery.isLoading &&
                podcastCategoriesQuery.data && (
                  <TableCaption>A list of all Categories.</TableCaption>
                )}
              <TableHeader className="bg-primary-foreground px-10">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              {podcastCategoriesQuery.isLoading && (
                <TableBody>
                  <TableSkeleton />
                  <TableSkeleton />
                  <TableSkeleton />
                  <TableSkeleton />
                </TableBody>
              )}
              {!podcastCategoriesQuery.isLoading &&
              podcastCategoriesQuery.data ? (
                podcastCategoriesQuery.data.map(
                  ({ id, name, description, slug, status }, idx) => {
                    return (
                      <TableBody key={idx}>
                        <TableRow>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell>{status}</TableCell>
                          <TableCell>
                            {truncateString(description, 20)}
                          </TableCell>
                          <TableCell>{slug}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => deletePodcastCategory(id)}
                              variant={"destructive"}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    );
                  }
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-20 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </Table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const TableSkeleton = () => (
  <TableRow>
    <TableCell className="font-medium">
      <Skeleton className="w-full h-6" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-full h-6" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-full h-6" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-full h-6" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-full h-6" />
    </TableCell>
  </TableRow>
);

export default Page;
