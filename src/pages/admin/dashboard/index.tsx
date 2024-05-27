import PageHead from '@/components/shared/page-head.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import RecentRegister from './components/recent-register';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
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
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
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
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
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
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
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
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
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
              <RecentRegister />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                {' '}
                <Badge className="bg-yellow-500">warn</Badge> Stuck Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2"></CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                <Badge variant="destructive">error</Badge> Problem Devices
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
