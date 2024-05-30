import { useState, useEffect } from 'react';
import PageHead from '@/components/shared/page-head.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import DeviceList from './components/device-list';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/api/dashboard';
import type { ResultType } from '@/api/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/api/auth';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ResultType | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const { checkRole } = auth();
  const { getStatictics } = dashboard();

  useEffect(() => {
    const fetchRoleAndData = async () => {
      try {
        const [role, statistics] = await Promise.all([
          checkRole(),
          getStatictics()
        ]);
        setRole(role);
        setData(statistics);
      } catch (error) {
        console.error('Failed to fetch role or statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleAndData();
    const intervalId = setInterval(fetchRoleAndData, 1000 * 4);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="p-5">
        <Skeleton />
      </div>
    );
  }
  return (
    <>
      <PageHead title="Dashboard | App" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back <span className="capitalize">{role}</span>
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">All Devices</CardTitle>
              <Cpu />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.all_devices}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Operational Devices
              </CardTitle>
              <CheckCircle />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.active.count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Devices with Issues
              </CardTitle>
              <AlertCircle />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.issue.count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Requiring Maintenance
              </CardTitle>
              <XCircle />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.problem.count}</div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                <Badge variant="secondary">new</Badge> Recent Registerred
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DeviceList data={data?.active.devices} />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                {' '}
                <Badge className="bg-yellow-500">warn</Badge> Stuck Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <DeviceList data={data?.issue.devices} />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                <Badge variant="destructive">error</Badge> Problem Devices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DeviceList data={data?.problem.devices} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
