import React, { ReactNode, Suspense } from 'react';
import NoAdminRedirect from '@/components/layout/unautorized-redirect';

interface RoleProviderProps {
  children: ReactNode;
  allowedRole: 'admin' | 'technician' | 'superadmin';
}

const RoleProvider: React.FC<RoleProviderProps> = ({
  children,
  allowedRole
}) => {
  return (
    <Suspense>
      <NoAdminRedirect allowedRole={allowedRole} />
      {children}
    </Suspense>
  );
};

export default RoleProvider;
