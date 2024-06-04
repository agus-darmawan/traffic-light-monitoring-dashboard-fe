import { useRouter } from '@/routes/hooks';
import { useState, useEffect } from 'react';
import { auth } from '@/api/auth';

export default function HomePage() {
  const { checkRole } = auth();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getRole = async () => {
      try {
        const role = await checkRole();
        if (role === 'admin' || role === 'superadmin') {
          router.push('/admin');
        } else if (role === 'technician') {
          router.push('/technicians');
        } else {
        }
      } catch (error) {
        console.error('Failed to fetch role:', error);
      } finally {
        setLoading(false);
      }
    };
    getRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>HomePage</div>;
}
