import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import UserTable from './components/users-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { users as usersApi } from '@/api/users';
import type { User } from '@/types/user';
import RoleProvider from '@/providers/role-provider';

export default function UserPage() {
  const { getUsers } = usersApi();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers('user');
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton columnCount={2} searchableColumnCount={1} />
      </div>
    );
  }

  return (
    <RoleProvider allowedRole="admin">
      <div className="p-5">
        <PageHead title="Zone | MasterData" />
        <UserTable users={users} pageCount={1} page={0} />
      </div>
    </RoleProvider>
  );
}
