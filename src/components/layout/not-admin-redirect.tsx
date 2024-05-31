import { useRouter } from '@/routes/hooks';
import { useState, useEffect } from 'react';
import { auth } from '@/api/auth';

export default function NoAuthRedirect() {
  const { checkRole } = auth();
  const [role, setRole] = useState<string | null>(null); // Initially set to null
  const router = useRouter();

  useEffect(() => {
    const getRole = async () => {
      try {
        const role = await checkRole();
        setRole(role);
      } catch (error) {
        console.error('Failed to fetch role:', error);
        setRole('user');
      }
    };
    getRole();
  }, []);

  useEffect(() => {
    if (role !== null && role !== 'admin' && role !== 'superadmin') {
      router.push('/login');
    }
  }, [role, router]);

  return null;
}
