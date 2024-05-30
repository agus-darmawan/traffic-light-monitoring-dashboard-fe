import { useRouter } from '@/routes/hooks';
import { useEffect } from 'react';
import { auth } from '@/api/auth';

export default function NoAuthRedirect() {
  const { loggedIn } = auth();
  console.log('login', loggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push('/login');
    }
  });

  return <></>;
}
