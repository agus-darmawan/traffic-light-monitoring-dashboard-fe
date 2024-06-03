import PageHead from '@/components/shared/page-head';
import { useState, useEffect } from 'react';
import DeviceTable from './components/devices-table';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { index as indexZone } from '@/api/zones';
import { index } from '@/api/devices';
import RoleProvider from '@/providers/role-provider';

export default function DevicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [zones, setZones] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [devicesData, zonesData] = await Promise.all([
          index(),
          indexZone()
        ]);
        setDevices(devicesData);
        setZones(zonesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton columnCount={5} filterableColumnCount={2} />
      </div>
    );
  }

  return (
    <RoleProvider allowedRole="admin">
      <div className="p-5">
        <PageHead title="Devices| MasterData" />
        <DeviceTable devices={devices} pageCount={1} page={0} zones={zones} />
      </div>
    </RoleProvider>
  );
}
