import React from 'react';
import { Box, styled } from '@mui/material';
import { useInAuthPage } from '../utils/inAuthPage';

export const PageWrapper = (props) => {
  const inAuthPage = useInAuthPage();

  const AuthPageWrapper = styled('div')(({ theme }) => ({
    width: '300px',
    height: '400px',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(10, 1fr)',
    gridColumn: '1/-1',
    gridRow: '1/-1',
    alignSelf: 'center',
    justifySelf: 'center',
    backgroundColor: [theme.palette.mode === 'light' ? 'white' : 'black'],
    borderRadius: '5px',
    boxShadow: [
      theme.palette.mode === 'light'
        ? `0px 0px 10px 1px rgba(0,0,0,0.6)`
        : `0px 0px 10px 1px rgba(252,255,252,0.6)`,
    ],
  }));

  return (
    <Box
      sx={{
        width: { mobile: '100%', tablet: inAuthPage ? '100%' : '80%' },
        height: '88vh',
        display: 'grid',
        position: 'relative',
        gridTemplateColumns: {
          mobile: 'repeat(1, 1fr)',
          tablet: 'repeat(1, 1fr)',
          wideTablet: inAuthPage ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
          laptop: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}>
      {!inAuthPage && props.children}
      {inAuthPage && <AuthPageWrapper>{props.children}</AuthPageWrapper>}
    </Box>
  );
};
