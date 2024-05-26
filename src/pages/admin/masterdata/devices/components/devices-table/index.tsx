import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import type { Zones } from '@/types/zones';
import type { Device } from '@/types/devices';
import DeviceTableActions from './device-table-action';

interface IDeviceTableProps {
  devices: Array<Device>;
  zones: Array<Zones>;
  page: number;
  pageCount: number;
}

export default function DeviceTable({
  devices,
  pageCount,
  zones
}: IDeviceTableProps) {
  return (
    <>
      <DeviceTableActions zones={zones} />
      {devices && (
        <DataTable columns={columns} data={devices} pageCount={pageCount} />
      )}
    </>
  );
}
