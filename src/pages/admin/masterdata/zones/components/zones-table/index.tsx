import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ZoneTableActions from './zone-table-action';
import type { Zones } from '@/types/zones';

interface IZoneTableProps {
  zones: Array<Zones>;
  page: number;
  pageCount: number;
}

export default function ZoneTable({ zones, pageCount }: IZoneTableProps) {
  return (
    <>
      <ZoneTableActions />
      {zones && (
        <DataTable columns={columns} data={zones} pageCount={pageCount} />
      )}
    </>
  );
}
