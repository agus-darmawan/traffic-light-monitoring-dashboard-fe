import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import type { User } from '@/types/user';

interface IUserTableProps {
  users: Array<User>;
  page: number;
  pageCount: number;
}

export default function UserTable({ users, pageCount }: IUserTableProps) {
  return (
    <div className="mt-16">
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </div>
  );
}
