import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import DeviceTable from './components/devices-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { index as indexZone } from '@/api/zones';
import { index } from '@/api/devices';

export default function DevicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [zones, setZones] = useState([]);
  const [devices, setDevices] = useState([]);
  const { getToken } = useAuthStore();
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesData = await index(token);
        const zonesData = await indexZone(token);
        setDevices(devicesData);
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
        <DataTableSkeleton columnCount={5} filterableColumnCount={2} />
      </div>
    );
  }

  return (
    <div className="p-5">
      <PageHead title="Devices| MasterData" />
      <DeviceTable devices={devices} pageCount={1} page={0} zones={zones} />
    </div>
  );
}
