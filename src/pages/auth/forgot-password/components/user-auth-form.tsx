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
import { forgotPassword } from '@/api/auth';
import { useState } from 'react';
import { useRouter } from '@/routes/hooks';
import { useToast } from '@/components/ui/use-toast';

const formForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formForgotPasswordSchema>;

export default function UserAuthForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      await forgotPassword(data.email);
      toast({
        title: 'Success',
        description: 'Please check your email'
      });
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: 'Failed',
          description: 'Please enter a valid email'
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
        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? 'Loading...' : 'Send Email'}
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
      </form>
    </Form>
  );
}
