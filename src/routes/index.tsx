import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

const SignInPage = lazy(() => import('@/pages/auth/signin'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const DashboardPage = lazy(() => import('@/pages/admin/dashboard'));
const ZonesPage = lazy(() => import('@/pages/admin/masterdata/zones'));
const RegionsPage = lazy(() => import('@/pages/admin/masterdata/regions'));
const DevicesPage = lazy(() => import('@/pages/admin/masterdata/devices'));
const UsersPage = lazy(() => import('@/pages/admin/users'));
const AdminPage = lazy(() => import('@/pages/admin/admin'));
const TechniciansPage = lazy(() => import('@/pages/admin/technicians'));
const TechnicianPage = lazy(() => import('@/pages/technicians'));

// ---------------------------------------------------

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/admin',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'technicians',
          element: <TechniciansPage />
        },
        {
          path: 'zones',
          element: <ZonesPage />
        },
        {
          path: 'regions',
          element: <RegionsPage />
        },
        {
          path: 'devices',
          element: <DevicesPage />
        },
        {
          path: 'users',
          element: <UsersPage />
        },
        {
          path: 'admin',
          element: <AdminPage />
        }
      ]
    }
  ];

  const technicianRoutes = [
    {
      path: '/technicians',
      element: (
        <DashboardLayout>
          <TechnicianPage />
        </DashboardLayout>
      )
    }
  ];

  const publicRoutes = [
    {
      path: '/',
      element: <LoginPage />,
      index: true
    },
    {
      path: '/register',
      element: <SignInPage />
    },
    {
      path: '/forgotPassword',
      element: <ForgotPasswordPage />
    },

    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([
    ...dashboardRoutes,
    ...publicRoutes,
    ...technicianRoutes
  ]);

  return routes;
}
