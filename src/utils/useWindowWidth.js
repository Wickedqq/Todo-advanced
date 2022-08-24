import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };

    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  return width;
};
