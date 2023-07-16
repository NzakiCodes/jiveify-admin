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
import { GoogleLogoIcon, YellowStar } from "@/components/atoms/Icons";
import Image from "next/image";
import Logo from "@/components/atoms/logo";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "@/config/constants";
import { CheckCircle, LoaderIcon, XCircleIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

const formSchema = z.object({
  fullname: z
    .string()
    .min(5, { message: "fullname should be at least 5 characters" })
    .max(70, { message: "fullname should not be more than 70 characters." }),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "password must be atleats 6 characters." })
    .max(70, { message: "password should not exceed 70 characters." }),
  password_confirmation: z
    .string()
    .min(6, { message: "password must be atleats 6 characters." })
    .max(70, { message: "password should not exceed 70 characters." }),
});

export default function Register() {
  const { toast } = useToast();
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSuccess = async (data: AxiosResponse<any, any>) => {
    if (data.status == 200 && data.data.token) {
      toast({
        description: (
          <div className="flex gap-x-1">
            <CheckCircle className="mr-1" /> Sign Up Successfull
          </div>
        ),
        className: "bg-green-100 text-green-600",
      });
      setToken(data.data.token);
      router.push("/home");
    }
  };

  const onError = (error: AxiosError<any, any>) => {
    if (!error?.response?.data.error) {
      toast({
        description: error.response?.data,
        variant: "destructive",
      });
    }

    const key = Object.keys(error.response?.data?.error)[0];
    toast({
      description: (
        <div className="flex gap-x-1">
          <XCircleIcon className="mr-1" />{" "}
          <span className="capitalize">
            {key} Error: {error.response?.data?.error[key]}
          </span>
        </div>
      ),
      variant: "destructive",
    });
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: (user: z.infer<typeof formSchema>) => {
      return axios.post(`${baseURL}/register`, user);
    },
    onSuccess,
    onError,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.fullname.split(" ")[2]) {
      return toast({
        description: (
          <div className="flex gap-x-1">
            <XCircleIcon className="mr-1" />{" "}
            <span>Use only First and Last Name!</span>
          </div>
        ),
        variant: "destructive",
      });
    }
    if (values.password !== values.password_confirmation) {
      return toast({
        description: (
          <div className="flex gap-x-1">
            <XCircleIcon className="mr-1" />{" "}
            <span>Password and Confirm Password Should Match! </span>
          </div>
        ),
        variant: "destructive",
      });
    }
    mutate({ ...values });
  }

  return (
    <main className="flex min-h-screen">
      <div className="hidden md:block md:w-1/2 lg:w-7/12 h-full min-h-screen relative login-bg">
        <div className="max-w-[672px] px-4 mx-auto my-20 flex flex-col gap-y-7">
          <Logo />
          <h1 className="text-3xl lg:text-5xl lg:leading-snug text-white font-semibold font-heading">
            Unlock Your Podcasting Potential
          </h1>
          <p className="text-base lg:text-xl lg:leading-8 text-white text-opacity-75 ">
            Create an Account on Jiveify and embark on your podcasting journey.
            Gain access to powerful tools, connect with a community of
            podcasters, and take your passion to new heights.
          </p>
          <div className="flex gap-x-4 w-[75%] lg:w-[50%]">
            <div className="w-1/2 relative h-10">
              <Image src={"/images/avatar_group.png"} fill alt="Avatar Group" />
            </div>
            <div className="w-1/2 font-medium text-base text-white items-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <YellowStar key={idx} />
                ))}
                <span> 5.0</span>
              </div>
              <p>from 200+ reviews</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-5/12  flex items-center justify-center flex-col px-6 md:px-4">
        <div className="max-w-[400px]  mx-auto w-full">
          <div className="flex flex-col gap-y-1 my-8">
            <h2 className="text-2xl font-medium font-heading">Join Jiveify</h2>
            <p className="leading-6 text-sm font-heading text-gray-600">
              Start Podcasting Today!
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 my-5"
              method="POST"
            >
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Full Name."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
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
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password."
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
                className="w-full "
                size={"xl"}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <span>Submit</span>
                )}
              </Button>
              <Button
                className="w-full flex gap-x-2 !py-4 justify-center"
                type="button"
                variant={"outline"}
              >
                <GoogleLogoIcon width={20} height={20} />{" "}
                <span>Sign up with Google</span>
              </Button>
            </form>
          </Form>
          <p className="text-center">
            Already have an Account?{" "}
            <Link className="text-purple-600" href={"/login"}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
