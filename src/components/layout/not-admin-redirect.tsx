import { useRouter } from '@/routes/hooks';
import { useState, useEffect } from 'react';
import { auth } from '@/api/auth';

export default function NoAuthRedirect() {
  const { checkRole } = auth();
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getRole = async () => {
      const role = await checkRole();
      setRole(role);
    };
    getRole();
  }, []);

  useEffect(() => {
    if (role !== 'admin' && role !== 'superadmin' && role !== null) {
      router.push('/login');
    }
  }, [role, router]);

  return null;
}
