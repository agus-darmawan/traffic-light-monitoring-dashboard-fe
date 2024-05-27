import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const NotAdminRedirect = lazy(
  () => import('@/components/layout/not-admin-redirect')
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

// ---------------------------------------------------

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <NotAdminRedirect />
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

  const publicRoutes = [
    {
      path: '/register',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/login',
      element: <LoginPage />,
      index: true
    },
    {
      path: '/forgotPassword',
      element: <ForgotPasswordPage />,
      index: true
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

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
