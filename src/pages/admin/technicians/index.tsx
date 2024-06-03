import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import TechniciansTable from './components';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { users } from '@/api/users';
import type { User } from '@/types/user';
import RoleProvider from '@/providers/role-provider';

export default function TechniciansPage() {
  const { getUsers } = users();
  const [isLoading, setIsLoading] = useState(true);
  const [technicians, setTechnicians] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technisiansData = await getUsers('technician');
        setTechnicians(technisiansData);
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
        <TechniciansTable technicians={technicians} pageCount={1} page={0} />
      </div>
    </RoleProvider>
  );
}
