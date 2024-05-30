import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Edit } from 'lucide-react';
import type { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { users } from '@/api/users';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const userFormSchema = z.object({
  email: z.string().min(1, { message: 'name is required' }),
  email_verified: z.boolean(),
  role: z.string().min(1, { message: 'role is required' })
});

type UserFormSchemaType = z.infer<typeof userFormSchema>;

interface UserUpdateFormProps {
  modalClose: () => void;
  data: User;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({
  modalClose,
  data
}) => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string>();
  const { updateUser } = users();
  const form = useForm<UserFormSchemaType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: data.email,
      email_verified: data.email_verified
    }
  });

  const onSubmit = async (values: UserFormSchemaType) => {
    try {
      const respone = await updateUser(data.id, values);
      console.log(respone);
      toast({
        title: 'Success',
        description: 'User have been updated successfully'
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      if (error) {
        toast({
          title: 'Failed',
          description: 'User failed to be updated'
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Update User</CardTitle>
          <CardDescription>Update entire user</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    {...field}
                    className=" px-4 py-2 shadow-inner drop-shadow-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={selectedRole?.toString() || ''}
                    onValueChange={(value) => {
                      setSelectedRole(value);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Timezone</SelectLabel>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="technician">technician</SelectItem>
                        <SelectItem value="user">user</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={modalClose}>
            Cancel
          </Button>
          <Button type="submit">
            {' '}
            <Edit className="mr-2 h-4 w-4" />
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
