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
import { register as registerUser } from '@/api/auth';
import { useState } from 'react';
import { useRouter } from '@/routes/hooks';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation']
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      await registerUser(data.email, data.password, data.passwordConfirmation);
      toast({
        title: 'Register Success',
        description: 'Congratulations, you have registered please Login'
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 409
      ) {
        toast({
          title: 'Email already taken',
          description:
            'The email address you entered is already registered. Please use a different email address.'
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
        <FormField
          control={form.control}
          name="passwordConfirmation"
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
