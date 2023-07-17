"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store";
import { CheckCircle, LoaderIcon, XCircleIcon } from "lucide-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { basePath, baseURL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(5, { message: "password must be atleats 5 characters." })
    .max(70, { message: "password should not exceed 70 characters." }),
});

export default function Register() {
  const { toast } = useToast();
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSuccess = async (data: AxiosResponse<any, any>) => {

    if (data.status == 200 && data.data.token) {
      toast({
        description: (
          <div className="flex gap-x-1">
            <CheckCircle className="mr-1" /> Login Successfull
          </div>
        ),
        className: "bg-green-100 text-green-600",
      });
      setToken(data.data.token);
      router.push(basePath);
    }
  };

  const onError = (error: AxiosError<any, any>) => {
    if (error?.response?.data.error.message) {
      toast({
        description: error.response?.data.error.message,
        variant: "destructive",
      });
    }
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: (user: z.infer<typeof formSchema>) => {
      return axios.post(`${baseURL}/login`, user);
    },
    onSuccess,
    onError,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ ...values });
  }

  return (
    <main className="flex min-h-screen ">
      <div className="w-full  flex items-center justify-center flex-col px-6 md:px-4">
        <div className="max-w-[400px]  mx-auto w-full">
          <div className="flex flex-col gap-y-1 my-8 text-center">
            <h2 className="text-2xl font-medium font-heading">
              Jiveify Admin
            </h2>
            <p className="leading-6 text-sm font-heading text-gray-600">
              Connect, create, and share your voice with the world.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 my-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email address."
                        required
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a password."
                        required
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-purple-700"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </form>
          </Form>
          {/* <p className="text-center">
            Don&#39;t have an Account?{" "}
            <Link className="text-purple-600" href={"/register"}>
              Register
            </Link>
          </p> */}
        </div>
      </div>
    </main>
  );
}
