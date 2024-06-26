import { useState, useEffect } from 'react';
import PageHead from '@/components/shared/page-head.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/api/auth';
import RoleProvider from '@/providers/role-provider';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const { checkRole } = auth();

  useEffect(() => {
    const fetchRoleAndData = async () => {
      try {
        const [role] = await Promise.all([checkRole()]);
        setRole(role);
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
    <RoleProvider allowedRole="technician">
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
              <div className="text-2xl font-bold">10</div>
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
              <div className="text-2xl font-bold">10</div>
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
              <div className="text-2xl font-bold">10</div>
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
              <div className="text-2xl font-bold">10</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleProvider>
  );
}
