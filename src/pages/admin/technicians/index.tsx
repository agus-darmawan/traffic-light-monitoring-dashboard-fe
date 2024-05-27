import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import TechniciansTable from './components';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { index } from '@/api/users';
import type { User } from '@/types/user';

export default function TechniciansPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [technicians, setTechnicians] = useState<Array<User>>([]);
  const { getToken } = useAuthStore();
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technisiansData = await index('technician', token);
        setTechnicians(technisiansData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    fetchData();
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
      <TechniciansTable technicians={technicians} pageCount={1} page={0} />
    </div>
  );
}
