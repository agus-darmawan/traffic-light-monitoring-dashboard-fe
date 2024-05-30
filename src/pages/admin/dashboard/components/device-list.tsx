import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Device } from '@/types/devices';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface DeviceListProps {
  data: Array<Device> | undefined;
}

export default function DeviceList({ data }: DeviceListProps) {
  if (!data) {
    return <p>No data</p>;
  }

  return (
    <ScrollArea className="-mt-6 space-y-2 rounded-md md:h-[calc(70vh-220px)]">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex items-end space-y-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{index + 1}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                <span className="font-semibold">
                  [TID] {item.tid} - {item.zone_name}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">{item.name}</p>
            </div>
            <div className="ml-auto text-sm font-semibold md:text-base">
              {item.region_name}
            </div>
          </div>
          <Separator className="my-2" />
        </div>
      ))}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
