'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().nonempty({ message: 'Enter a valid password' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { toast } = useToast()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/predictions';
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(data: UserFormValue) {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false,
        callbackUrl: callbackUrl
      });

      if (result?.error) {
        toast({
          title: "Authentication failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.url) {
        toast({
          title: "Login Successful",
          description: "Redirecting...",
        });
        window.location.href = result.url;
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={isLoading}
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
                  type="password"
                  placeholder="Enter your password..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
}