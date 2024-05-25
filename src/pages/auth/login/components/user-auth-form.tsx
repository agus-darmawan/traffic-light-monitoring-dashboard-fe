import { Button } from '@/components/ui/button';
import { AxiosError } from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { login as loginUser } from '@/api/auth';
import { useState } from 'react';
import { useRouter } from '@/routes/hooks';
import { useToast } from '@/components/ui/use-toast';

const formLoginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
});

type UserFormValue = z.infer<typeof formLoginSchema>;

export default function UserAuthForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formLoginSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      await loginUser(data.email, data.password);
      toast({
        title: 'Login Success',
        description: 'Congratulations, you have login'
      });
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: 'Login Failed',
          description: 'Please check your email and password'
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
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
                  disabled={loading}
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
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? 'Loading...' : 'Login'}
        </Button>
        <div className=" flex gap-2 pt-2 text-sm">
          <h3 className="">Does't have account</h3>
          <Link
            to="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Register
          </Link>{' '}
        </div>
        <Link
          to="/register"
          className=" text-sm underline underline-offset-4 hover:text-primary"
        >
          Forgot password
        </Link>{' '}
      </form>
    </Form>
  );
}
