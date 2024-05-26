import Heading from '@/components/shared/heading';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useAuthStore from '@/stores/useAuthStore';
import { useToast } from '@/components/ui/use-toast';
import { store } from '@/api/regions';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Zones } from '@/types/zones';

const regionFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  zone_id: z.number().min(1, { message: 'Zone ID is required' }),
  timezone: z.string().min(3, { message: 'Timezone is required' })
});

type RegionFormSchemaType = z.infer<typeof regionFormSchema>;

interface RegionUpdateFormProps {
  modalClose: () => void;
  zones: Zones[];
}

const RegionUpdateForm: React.FC<RegionUpdateFormProps> = ({
  modalClose,
  zones
}) => {
  const { toast } = useToast();
  const { getToken } = useAuthStore();
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>();
  const token = getToken();

  const form = useForm<RegionFormSchemaType>({
    resolver: zodResolver(regionFormSchema)
  });

  const onSubmit = async (values: RegionFormSchemaType) => {
    try {
      await store(values, token);
      toast({
        title: 'Success',
        description: 'Region has been updated successfully'
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      toast({
        title: 'Failed',
        description: 'Region failed to be updated'
      });
    }
  };

  return (
    <div className="px-2">
      <Heading
        title={'Update Region'}
        description={'Please edit the value.'}
        className="mb-2 py-2 text-center"
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
                    placeholder="Enter region name"
                    {...field}
                    className="px-4 py-2 shadow-inner drop-shadow-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter timezone"
                    {...field}
                    className="px-4 py-2 shadow-inner drop-shadow-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zone_id"
            render={({ field }) => (
              <FormItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {selectedZoneId
                        ? zones.find((zone) => zone.id === selectedZoneId)?.name
                        : 'Select Zone'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Zone</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={selectedZoneId?.toString()}
                      onValueChange={(value) => {
                        const intValue = parseInt(value, 10);
                        setSelectedZoneId(intValue);
                        field.onChange(intValue);
                      }}
                    >
                      {zones.map((zone) => (
                        <DropdownMenuRadioItem
                          key={zone.id}
                          value={zone.id.toString()}
                        >
                          {zone.name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full">
              Update Region
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegionUpdateForm;
