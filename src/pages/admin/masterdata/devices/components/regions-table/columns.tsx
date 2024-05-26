import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Region } from '@/types/region';
import type { Zones } from '@/types/zones';
import { CellAction } from './cell-action';

type TColumnDef = Region & {
  zones: Zones;
};

export const columns: ColumnDef<TColumnDef>[] = [
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
    header: 'DEVICE NAME'
  },
  {
    accessorKey: 'zone_name',
    header: 'ZONE NAME'
  },
  {
    accessorKey: 'region_name',
    header: 'REGION NAME'
  },
  {
    accessorKey: 'register_by',
    header: 'REGISTER BY'
  },
  {
    header: 'ACTIONS',
    id: 'actions',
    cell: ({ row }) => (
      <CellAction data={row.original} zones={row.original.zones} />
    )
  }
];
