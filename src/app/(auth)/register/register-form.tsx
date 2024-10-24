"use client";

import React from "react";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import Link from "next/link";
import envConfig from "@/config";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const RegisterForm = () => {
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      // status: Int,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    // console.log(envConfig.NEXT_PUBLIC_API_ENDPOINT);
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
      {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST", // Đổi từ GET thành POST
      }
    ).then((res) => res.json());
    console.log(result);
  }
  return (
    <Form {...form}>
      <div className="@container container flex w-full max-w-lg flex-col gap-3 md:gap-6">
        <div className="flex flex-col gap-3 rounded py-3 md:border md:bg-background md:px-5 md:py-3">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="">
                    <Input
                      className="shadow appearance-none border border-x-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                      placeholder="abc@gmail.com"
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
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow appearance-none border border-x-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow appearance-none border border-x-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                      placeholder="shadcn"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow appearance-none border border-x-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                      placeholder="shadcn"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow appearance-none border border-x-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
                      placeholder="shadcn"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="!mt-7 w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </div>
        <div className="mt-2 flex justify-between rounded-lg ...">
          <p className="text-sm font-normal ">
            Already have a SoulDev account?
          </p>
          <a className="text-sm font-semibold  hover:opacity-70" href="/login">
            {" "}
            Login account
          </a>
        </div>
      </div>
    </Form>
  );
};

export default RegisterForm;
