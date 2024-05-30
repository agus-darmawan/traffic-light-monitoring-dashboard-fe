import { Button } from '@/components/ui/button';
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
import { auth } from '@/api/auth';
import { useState } from 'react';
import { useRouter } from '@/routes/hooks';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    password_confirmation: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation']
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { register } = auth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
    password_confirmation: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      setLoading(true);
      await register(data);
      router.push('/login');
    } catch (error) {
      setLoading(false);
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
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div className=" flex gap-2 pt-2 text-sm">
          <h3 className="">Allredy have account</h3>
          <Link
            to="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>{' '}
        </div>
      </form>
    </Form>
  );
}
