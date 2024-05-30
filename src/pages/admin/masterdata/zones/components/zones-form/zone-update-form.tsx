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
import type { Zones } from '@/types/zones';
import { useToast } from '@/components/ui/use-toast';
import { update } from '@/api/zones';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const zoneFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' })
});

type ZoneFormSchemaType = z.infer<typeof zoneFormSchema>;

interface ZoneUpdateFormProps {
  modalClose: () => void;
  data: Zones;
}

const ZoneUpdateForm: React.FC<ZoneUpdateFormProps> = ({
  modalClose,
  data
}) => {
  const { toast } = useToast();
  const form = useForm<ZoneFormSchemaType>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      name: data.name
    }
  });

  const onSubmit = async (values: ZoneFormSchemaType) => {
    try {
      await update(data.id, values);
      toast({
        title: 'Success',
        description: 'Zone have been updated successfully'
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      if (error) {
        toast({
          title: 'Failed',
          description: 'Zone failed to be updated'
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Update Zone</CardTitle>
          <CardDescription>Update entire zone data</CardDescription>
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
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default ZoneUpdateForm;
