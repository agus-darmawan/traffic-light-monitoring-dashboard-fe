import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import UserTable from './components/users-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { index } from '@/api/users';
import type { User } from '@/types/user';

export default function UserPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Array<User>>([]);
  const { getToken } = useAuthStore();
  const token = getToken();

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const usersData = await index(token);
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    fetchZones();
  }, [token]);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton columnCount={2} searchableColumnCount={1} />
      </div>
    );
  }

  return (
    <div className="p-5">
      <PageHead title="Zone | MasterData" />
      <UserTable users={users} pageCount={1} page={0} />
    </div>
  );
}
