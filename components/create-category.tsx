import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListPlusIcon, LoaderIcon, PlusIcon } from "lucide-react";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CheckCircleIcon } from "lucide-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { baseURL } from "@/config/constants";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(20, { message: "Name should not be more than 20 characters." }).trim(),
  description: z
    .string()
    .min(5, { message: "description must be atleats 5 characters." })
    .max(100, { message: "description should not exceed 100 characters." }).trim(),
});

export function CreateCatogory() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSuccess = async (data: AxiosResponse<any, any>) => {
    toast({
      description: (
        <div className="flex gap-x-1">
          <CheckCircleIcon className="mr-1" /> Added
        </div>
      ),
      className: "bg-green-100 text-green-600",
    });
  };

  const onError = (error: AxiosError<any, any>) => {
    console.log(error)
    if (error?.response?.data.error.message) {
      // toast({
      //   description: error.response?.data.error.message,
      //   variant: "destructive",
      // });
    }
  };

  const { isLoading, mutate } = useMutation({
    mutationKey:["create-category"],
    mutationFn: (post: z.infer<typeof formSchema>) => {
      return axios.post(`${baseURL}/podcast/category`, post);
    },
    onSuccess,
    onError,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate({ ...values });
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <ListPlusIcon className="mr-2" />
          Create Categories
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Category</SheetTitle>
          <SheetDescription>
            Create a category for your podcast. Click save when you&#39;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
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
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Motivational"
                        className="col-span-3"
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
              <SheetFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    <>
                      <PlusIcon />
                      Create
                    </>
                  )}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
