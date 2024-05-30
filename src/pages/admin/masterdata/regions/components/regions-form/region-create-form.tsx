import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { useToast } from '@/components/ui/use-toast';
import { store } from '@/api/regions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Zones } from '@/types/zones';

const regionFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  zone_id: z.number().min(1, { message: 'Zone ID is required' }),
  timezone: z.string().min(3, { message: 'Timezone is required' })
});

type RegionFormSchemaType = z.infer<typeof regionFormSchema>;

interface RegionCreateFormProps {
  modalClose: () => void;
  zones: Zones[];
}

const RegionCreateForm: React.FC<RegionCreateFormProps> = ({
  modalClose,
  zones
}) => {
  const { toast } = useToast();
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);

  const form = useForm<RegionFormSchemaType>({
    resolver: zodResolver(regionFormSchema)
  });

  const onSubmit = async (values: RegionFormSchemaType) => {
    try {
      await store(values);
      toast({
        title: 'Success',
        description: 'Region has been created successfully'
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      toast({
        title: 'Failed',
        description: 'Region failed to be created'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Create Region</CardTitle>
          <CardDescription>Create new region</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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
                  <Select
                    value={selectedTimezone?.toString() || ''}
                    onValueChange={(value) => {
                      setSelectedTimezone(value);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Timezone</SelectLabel>
                        <SelectItem value="WIT">WIT</SelectItem>
                        <SelectItem value="WITA">WITA</SelectItem>
                        <SelectItem value="WIB">WIB</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                <FormControl>
                  <Select
                    value={selectedZoneId?.toString() || ''}
                    onValueChange={(value) => {
                      const intValue = parseInt(value, 10);
                      setSelectedZoneId(intValue);
                      field.onChange(intValue);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Zone</SelectLabel>
                        {zones.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id.toString()}>
                            {zone.name}
                          </SelectItem>
                        ))}
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
            <Edit className="mr-2 h-4 w-4" />
            Create
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default RegionCreateForm;
