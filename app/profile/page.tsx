"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { basePath } from "@/config/constants";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, SaveIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "fullname should be at least 5 characters" })
    .max(70, { message: "fullname should not be more than 70 characters." }),
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(5, { message: "username should be at least 5 characters" })
    .max(70, { message: "username should not be more than 70 characters." }),
  address: z
    .string()
    .min(5, { message: "address should be at least 5 characters" })
    .max(70, { message: "address should not be more than 70 characters." }),
  city: z
    .string()
    .min(6, { message: "city must be atleats 6 characters." })
    .max(70, { message: "city should not exceed 70 characters." }),
  country: z
    .string()
    .min(6, { message: "country must be atleats 6 characters." })
    .max(70, { message: "country should not exceed 70 characters." }),
  zip_code: z.number().min(5).max(6),
});
function Page() {
  const user = useAuthStore((s) => s.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: user?.fullname,
      username: user?.username,
      email: user?.email,
      address: user?.address,
      city: user?.city,
      country: user?.country,
      zip_code: user?.zip_code,
    },
  });
  return (
    <div className="p-4 md:px-8 lg:p-16">
      <div>
        <Link
          href={basePath}
          className="flex items-center gap-x-4 w-24 hover:opacity-95"
        >
          <Button variant={"outline"} className="rounded-full" size={"icon"}>
            <ChevronLeft />
          </Button>
          <span>Back</span>
        </Link>
      </div>
      <Form {...form}>
        <div className="py-3 lg:py-6 lg:px-14">
          <div className="flex justify-between items-center gap-x-1 ">
            <div className="flex flex-col lg:gap-y-4 w-3/4">
              <h3 className="text-xl lg:text-3xl font-heading font-bold">
                Settings Page
              </h3>
              <p className="text-xs lg:text-sm">
                Update your photo and personal details here.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-x-3 lg:space-x-2 lg:space-y-0 ">
              <Button variant={"outline"} type="button" size={"lg"}>
                <XIcon className="md:hidden" />
                <span className="hidden md:inline">Cancel</span>
              </Button>
              <Button
                variant={"ghost"}
                size={"lg"}
                type="submit"
                className="bg-purple-600 hover:bg-purple-500"
              >
                <SaveIcon className="md:hidden" />
                <span className="hidden md:inline">Save</span>
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="lg:w-2/3 my-10 border rounded-xl">
              <div className="p-4">
                <span className="font-heading font-bold text-xl">
                  Personal Information
                </span>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4  p-4">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fullname</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Fullname" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Email" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Username" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Address" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Zip Code" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Country" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Page;
