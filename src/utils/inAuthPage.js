import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useInAuthPage = () => {
  const [inAuthPage, setinAuthPage] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const inAuth = pathname === '/login' || pathname === '/register';
    setinAuthPage(inAuth);
  }, [pathname]);

  return inAuthPage;
};
