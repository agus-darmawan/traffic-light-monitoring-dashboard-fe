import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import ZoneTable from './components/zones-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { index } from '@/api/zones';

export default function ZonesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [zones, setZones] = useState([]);
  const { getToken } = useAuthStore();
  const token = getToken();

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const zonesData = await index(token);
        setZones(zonesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching zones:', error);
        setIsLoading(false);
      }
    };

    fetchZones();
  }, [token]);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={2}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-5">
      <PageHead title="Zone | MasterData" />
      <ZoneTable
        zones={zones}
        pageCount={1}
        page={0}
        totalUsers={zones.length}
      />
    </div>
  );
}
