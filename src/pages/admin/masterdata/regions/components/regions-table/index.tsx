import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import RegionTableActions from './region-table-action';

type TRegionTableProps = {
  regions: any;
  page: number;
  pageCount: number;
};

export default function RegionTable({ regions, pageCount }: TRegionTableProps) {
  return (
    <>
      <RegionTableActions />
      {regions && (
        <DataTable columns={columns} data={regions} pageCount={pageCount} />
      )}
    </>
  );
}
