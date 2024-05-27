import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import type { User } from '@/types/user';

interface IAdminsTableProps {
  admins: Array<User>;
  page: number;
  pageCount: number;
}

export default function AdminsTable({ admins, pageCount }: IAdminsTableProps) {
  return (
    <div className="mt-16">
      {admins && (
        <DataTable columns={columns} data={admins} pageCount={pageCount} />
      )}
    </div>
  );
}
