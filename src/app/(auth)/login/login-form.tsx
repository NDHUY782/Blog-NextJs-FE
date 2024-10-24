"use client";

import React from "react";
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
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useToast_Test } from "@/components/ui/toast-context";

const LoginForm = () => {
  const { showToast } = useToast_Test();
  const { toast } = useToast();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      showToast("Login successful!", "success");
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: string;
        message: string;
      }[];
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Login failed!",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
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
            <div className="flex items-center justify-end">
              <a
                className="my-4 text-center text-xs font-semibold italic"
                href="#"
              >
                Forget your password?
              </a>
            </div>
            <div className="flex items-center gap-3 p-2">
              <div className="h-px w-full flex-1 border"></div>
              <span className="text-base font-bold uppercase text-neutral-400">
                Or
              </span>
              <div className="h-px w-full flex-1 border"></div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center justify-center gap-3">
                <img
                  alt="Google"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  src="https://souldev.online/_next/static/media/google.4b6efeab.svg"
                />
                Sign In With Google
              </button>
              <button className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center justify-center gap-3">
                <img
                  alt="Github"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  src="https://souldev.online/_next/static/media/github-mark.3b925f14.svg"
                />
                Sign In With Github
              </button>
            </div>
            <Button className="!mt-7 w-full" type="submit">
              Log In
            </Button>
          </form>
        </div>
        <div className="mt-2 flex justify-between rounded-lg ...">
          <p className="text-sm font-normal ">
            Dont Have Account? Please Sign Up !!{" "}
          </p>
          <a
            className="text-sm font-semibold  hover:opacity-70"
            href="/register"
          >
            {" "}
            Sign up account
          </a>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
