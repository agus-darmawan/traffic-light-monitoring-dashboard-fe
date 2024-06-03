import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import AdminsTable from './components';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { users } from '@/api/users';
import type { User } from '@/types/user';
import RoleProvider from '@/providers/role-provider';

export default function AdminPage() {
  const { getUsers } = users();
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await getUsers('admin');
        setAdmin(adminData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };
    fetchAdmin();
  });

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton columnCount={2} searchableColumnCount={1} />
      </div>
    );
  }

  return (
    <RoleProvider allowedRole="superadmin">
      <div className="p-5">
        <PageHead title="Zone | MasterData" />
        <AdminsTable admins={admin} pageCount={1} page={0} />
      </div>
    </RoleProvider>
  );
}
