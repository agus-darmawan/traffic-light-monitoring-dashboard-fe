import useAuthStore from '@/stores/useAuthStore';
import { useRouter } from '@/routes/hooks';
import { useEffect } from 'react';

export default function NoAuthRedirect() {
  const { getToken } = useAuthStore();
  const router = useRouter();
  const token = getToken();
  useEffect(() => {
    console.log('TRiggered redirect', token);
    if (!token) {
      router.push('/login');
    }
  });

  return <></>;
}
