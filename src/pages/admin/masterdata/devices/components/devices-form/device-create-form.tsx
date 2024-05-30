import { useState, useEffect } from 'react';
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
import type { Region } from '@/types/region';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Zones } from '@/types/zones';
import { showByZone } from '@/api/regions';
import { store } from '@/api/devices';

const deviceFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  zone_id: z.number().min(1, { message: 'Zone ID is required' }),
  region_id: z.number().min(1, { message: 'Region ID is required' })
});

type DeviceFormSchemaType = z.infer<typeof deviceFormSchema>;

interface DeviceCreateFormProps {
  modalClose: () => void;
  zones: Zones[];
}

const DeviceCreateForm: React.FC<DeviceCreateFormProps> = ({
  modalClose,
  zones
}) => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [regions, setRegions] = useState<Array<Region>>([]);

  const form = useForm<DeviceFormSchemaType>({
    resolver: zodResolver(deviceFormSchema)
  });

  const onSubmit = async (values: DeviceFormSchemaType) => {
    try {
      await store(values);
      toast({
        title: 'Success',
        description: 'Device has been register successfully'
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      toast({
        title: 'Failed',
        description: 'Device failed to be registered'
      });
    }
  };
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        setLoading(true);
        const fetchedRegions = await showByZone(
          selectedZoneId ? selectedZoneId : 0
        );
        setRegions(fetchedRegions);
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegion();
  }, [selectedZoneId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Register Device</CardTitle>
          <CardDescription>Register new device data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter device name"
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
          <FormField
            control={form.control}
            name="region_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={selectedRegionId?.toString() || ''}
                    onValueChange={(value) => {
                      const intValue = parseInt(value, 10);
                      setSelectedRegionId(intValue);
                      field.onChange(intValue);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Zone</SelectLabel>
                        {loading ? (
                          <SelectItem value="0" disabled>
                            Loading...
                          </SelectItem>
                        ) : (
                          regions.map((region) => (
                            <SelectItem
                              key={region.id}
                              value={region.id.toString()}
                            >
                              {region.name}
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

export default DeviceCreateForm;
