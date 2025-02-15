import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;