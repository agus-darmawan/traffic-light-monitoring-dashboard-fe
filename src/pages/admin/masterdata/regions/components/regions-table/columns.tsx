import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Region } from '@/types/region';
import { CellAction } from './cell-action';
import { show } from '@/api/zones';
import useAuthStore from '@/stores/useAuthStore';

const ZoneNameCell = ({ zoneId }) => {
  const [zoneName, setZoneName] = useState('Loading...');
  const getToken = useAuthStore((state) => state.getToken);

  useEffect(() => {
    const getZoneName = async () => {
      const name = await show(zoneId, getToken());
      setZoneName(name.name || 'Not found');
    };

    getZoneName();
  }, [zoneId, getToken]);

  return <span>{zoneName}</span>;
};

export const columns: ColumnDef<Region>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'REGION NAME'
  },
  {
    accessorKey: 'zone_id',
    header: 'ZONE NAME',
    cell: ({ row }) => <ZoneNameCell zoneId={row.original.zone_id} />
  },
  {
    accessorKey: 'timezone',
    header: 'TIMEZONE'
  },
  {
    header: 'ACTIONS',
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
