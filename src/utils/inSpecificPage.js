import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useInSpecificPage = () => {
  const [currentLocation, setCurrentLocation] = useState({
    inUserPage: null,
    inAuthPage: null,
    currentPage: '',
  });
  const { pathname } = useLocation();

  useEffect(() => {
    const inAuth = pathname === '/login' || pathname === '/register';
    setCurrentLocation((prev) => ({ ...prev, inAuthPage: inAuth }));
    const inUser = pathname === '/me';
    setCurrentLocation((prev) => ({ ...prev, inUserPage: inUser }));
    setCurrentLocation((prev) => ({ ...prev, currentPage: pathname }));
  }, [pathname]);

  return currentLocation;
};
