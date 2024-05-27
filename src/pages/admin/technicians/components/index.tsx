import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import type { User } from '@/types/user';

interface ITechniciansTableProps {
  technicians: Array<User>;
  page: number;
  pageCount: number;
}

export default function TechniciansTable({
  technicians,
  pageCount
}: ITechniciansTableProps) {
  return (
    <div className="mt-16">
      {technicians && (
        <DataTable columns={columns} data={technicians} pageCount={pageCount} />
      )}
    </div>
  );
}
