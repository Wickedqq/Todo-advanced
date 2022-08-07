import { useEffect, useState } from 'react';

export const UseWindowSize = () => {
  const [width, setWidht] = useState();

  useEffect(() => {
    function getWidth(event) {
      const width = event.target.innerWidth;
      setWidht(width);
    }

    window.addEventListener('resize', getWidth);
    return () => {
      window.removeEventListener('resize', getWidth);
    };
  });

  return width;
};
