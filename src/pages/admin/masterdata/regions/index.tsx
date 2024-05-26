import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import RegionTable from './components/regions-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { index } from '@/api/regions';
import { index as indexZone } from '@/api/zones';

export default function ZonesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [zones, setZones] = useState([]);
  const { getToken } = useAuthStore();
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionsData = await index(token);
        const zonesData = await indexZone(token);
        setRegions(regionsData);
        setZones(zonesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton columnCount={3} filterableColumnCount={2} />
      </div>
    );
  }

  return (
    <div className="p-5">
      <PageHead title="Regions | MasterData" />
      <RegionTable regions={regions} pageCount={1} page={0} zones={zones} />
    </div>
  );
}
