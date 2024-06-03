import { useRouter } from '@/routes/hooks';
import { useState, useEffect } from 'react';
import { auth } from '@/api/auth';

interface IRoleProps {
  allowedRole: 'admin' | 'technician' | 'superadmin';
}

const NoAdminRedirect: React.FC<IRoleProps> = ({ allowedRole }) => {
  const { checkRole } = auth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getRole = async () => {
      try {
        const role = await checkRole();
        setRole(role);
      } catch (error) {
        console.error('Failed to fetch role:', error);
        setRole('user');
      } finally {
        setLoading(false);
      }
    };
    getRole();
  }, [checkRole]);

  useEffect(() => {
    if (
      !loading &&
      role !== null &&
      role !== allowedRole &&
      role !== 'superadmin'
    ) {
      router.push('/login');
    }
  }, [role, allowedRole, router, loading]);

  // Ensure nothing is rendered until role is checked
  if (loading || role === null) {
    return <div>Loading...</div>;
  }

  return null;
};

export default NoAdminRedirect;
