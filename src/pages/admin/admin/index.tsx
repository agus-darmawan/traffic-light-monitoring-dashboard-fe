import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import AdminsTable from './components';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { index } from '@/api/users';
import type { User } from '@/types/user';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<Array<User>>([]);
  const { getToken } = useAuthStore();
  const token = getToken();

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const adminData = await index('admin', token);
        setAdmin(adminData);
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
      <AdminsTable admins={admin} pageCount={1} page={0} />
    </div>
  );
}
