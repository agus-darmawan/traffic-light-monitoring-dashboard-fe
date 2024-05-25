import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import ZoneTableActions from './zone-table-action';

type TZoneTableProps = {
  zones: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function ZoneTable({ zones, pageCount }: TZoneTableProps) {
  return (
    <>
      <ZoneTableActions />
      {zones && (
        <DataTable columns={columns} data={zones} pageCount={pageCount} />
      )}
    </>
  );
}
