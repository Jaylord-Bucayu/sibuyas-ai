'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams,useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().nonempty({ message: 'Enter a valid password' })
});



import { useToast } from "@/hooks/use-toast"

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {

    const { toast } = useToast()

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    "email":"",
    "password":""
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
  const router = useRouter();
  
  async function onSubmit(data: any) {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
     callbackUrl: callbackUrl ?? '/predictions'
    });


  if (signInResult?.url) {
      router.push('/predictions')
    }

    setIsLoading(false);
    
    if (!signInResult?.ok || signInResult?.error) {
      return toast({
        title: "Something went wrong.",
        description: signInResult?.error,
        variant: "destructive",
      });
    }

    router.refresh();

    return toast({
      title: "Login Successful",
      description: "Successfully Logged In!",
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
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

            
              </>
            )}
          />

<FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
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

            
              </>
            )}
          />

  
          <Button disabled={isLoading} className="ml-auto w-full" type="submit">
            Sign in
          </Button>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <GithubSignInButton /> */}
    </>
  );
}
