import { Button } from '@/components/ui/button';
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
import { Edit } from 'lucide-react';
import useAuthStore from '@/stores/useAuthStore';
import { useToast } from '@/components/ui/use-toast';
import { store } from '@/api/zones';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const zoneFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' })
});

type ZoneFormSchemaType = z.infer<typeof zoneFormSchema>;

const ZoneCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const { toast } = useToast();
  const { getToken } = useAuthStore();
  const form = useForm<ZoneFormSchemaType>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {}
  });
  const token = getToken();

  const onSubmit = async (values: ZoneFormSchemaType) => {
    try {
      await store(values, token);
      toast({
        title: 'Success',
        description: 'Zone have been created successfully'
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      if (error) {
        toast({
          title: 'Failed',
          description: 'Zone failed to be created'
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Create Zone</CardTitle>
          <CardDescription>Create new zone</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter zone name"
                    {...field}
                    className=" px-4 py-2 shadow-inner drop-shadow-xl"
                  />
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
            Create
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default ZoneCreateForm;
