import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import RegionTableActions from './region-table-action';

type TRegionTableProps = {
  data: any;
  regions: any;
  zones: any;
  page: number;
  pageCount: number;
};

export default function RegionTable({
  data,
  regions,
  pageCount,
  zones
}: TRegionTableProps) {
  return (
    <>
      <RegionTableActions zones={zones} />
      {regions && (
        <DataTable columns={columns} data={data} pageCount={pageCount} />
      )}
    </>
  );
}
