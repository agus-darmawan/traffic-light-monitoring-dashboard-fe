import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Edit } from 'lucide-react';
import type { Zones } from '@/types/zones';
import useAuthStore from '@/stores/useAuthStore';
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
  const { getToken } = useAuthStore();
  const form = useForm<ZoneFormSchemaType>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      name: data.name
    }
  });
  const token = getToken();

  const onSubmit = async (values: ZoneFormSchemaType) => {
    try {
      const respone = await update(data.id, values, token);
      console.log(respone);
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
    <div className="px-2">
      <Heading
        title={'Update Zone'}
        description={'Please edit value'}
        className="text-cente mb-2 py-2 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full "
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button variant="secondary" className="px-3 py-2">
              <Edit className="mr-2 h-4 w-4" /> Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ZoneUpdateForm;
