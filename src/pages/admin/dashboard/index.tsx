import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import PageHead from '@/components/shared/page-head.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import DeviceList from './components/device-list';
import { Badge } from '@/components/ui/badge';
import { index } from '@/api/dashboard';
import type { ResultType } from '@/api/dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useAuthStore();
  const [data, setData] = useState<ResultType>();
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await index(token);
        setData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching error:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

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
            Hi, Welcome back Admin
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
