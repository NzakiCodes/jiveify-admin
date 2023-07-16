"use client";
import Topbar from "@/components/topbar";
import React, { Fragment } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosAuth } from "@/config/axios";
import { Podcastcategory } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name is too short" })
    .max(20, { message: "Name should not be more than 20 characters." })
    .trim(),
  description: z
    .string()
    .min(5, { message: "description must be atleats 5 characters." })
    .max(100, { message: "description should not exceed 100 characters." })
    .trim(),
  location: z.string().min(5).max(70),
  category: z.string().min(1),
});

const getCategories = (data: any): Promise<Podcastcategory[]> =>
  axiosAuth.get("/podcast/categories").then((response) => response.data);

function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "1",
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // mutate({ ...values });
  }
  return (
    <Fragment>
      <Topbar />
      <div>
        <div className=" px-4 py-6 lg:px-8">
          <h2 className="">Publish your podcast</h2>
          <div className="grid gap-4 py-4 w-2/3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 my-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className=" space-y-2 gap-4">
                      <FormLabel className="text-right">
                        Podcast Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Motivational"
                          className="col-span-3 py-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className=" space-y-2 gap-4">
                      <FormLabel className="text-right">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Give a description about your podcast category."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 justify-between gap-x-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className=" space-y-2 gap-4">
                        <FormLabel className="text-right">
                          Podcast Category
                        </FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="1">Apple</SelectItem>
                              <SelectItem value="2">Orange</SelectItem>
                              <SelectItem value="3">Orange</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className=" space-y-2 gap-4">
                        <FormLabel className="text-right">Location</FormLabel>
                        <FormControl>
                          <Input
                            id="location"
                            placeholder="Motivational"
                            className="col-span-3 py-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit">
                  <PlusIcon />
                  Publish
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Page;
