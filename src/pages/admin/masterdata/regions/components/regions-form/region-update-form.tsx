import { useState, useEffect } from 'react';
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
import useAuthStore from '@/stores/useAuthStore';
import { useToast } from '@/components/ui/use-toast';
import { update } from '@/api/regions';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Zones } from '@/types/zones';
import type { Region } from '@/types/region';
import { index } from '@/api/zones';

const regionFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  zone_id: z.number().min(1, { message: 'Zone ID is required' }),
  timezone: z.string().min(3, { message: 'Timezone is required' })
});

type RegionFormSchemaType = z.infer<typeof regionFormSchema>;

interface RegionUpdateFormProps {
  modalClose: () => void;
  data: Region;
}

const RegionUpdateForm: React.FC<RegionUpdateFormProps> = ({
  modalClose,
  data
}) => {
  const { toast } = useToast();
  const { getToken } = useAuthStore();
  const [zones, setZones] = useState<Zones[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(
    data.timezone
  );
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(
    data.zone_id
  );
  const token = getToken();

  const form = useForm<RegionFormSchemaType>({
    resolver: zodResolver(regionFormSchema),
    defaultValues: {
      name: data.name,
      zone_id: data.zone_id,
      timezone: data.timezone
    }
  });

  const onSubmit = async (values: RegionFormSchemaType) => {
    try {
      await update(data.id, values, token);
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

  useEffect(() => {
    const fetchZones = async () => {
      try {
        setLoading(true);
        const fetchedZones = await index(token);
        setZones(fetchedZones);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch zones:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchZones();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Update Region</CardTitle>
          <CardDescription>Update entire region</CardDescription>
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
                        {loading ? (
                          <SelectItem value="0" disabled>
                            Loading...
                          </SelectItem>
                        ) : (
                          zones.map((zone) => (
                            <SelectItem
                              key={zone.id}
                              value={zone.id.toString()}
                            >
                              {zone.name}
                            </SelectItem>
                          ))
                        )}
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

export default RegionUpdateForm;
