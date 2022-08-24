import React from 'react';
import { Box, styled } from '@mui/material';
import { useInSpecificPage } from '../utils/inSpecificPage';

export const PageWrapper = (props) => {
  const { inAuthPage, inUserPage } = useInSpecificPage();

  const AuthPageWrapper = styled(Box)(({ theme }) => ({
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
    borderRadius: '5px',
    boxShadow: [
      theme.palette.mode === 'light'
        ? `0px 0px 10px 1px rgba(0,0,0,0.6)`
        : `0px 0px 10px 1px rgba(252,255,252,0.6)`,
    ],
  }));

  const UserPageWrapper = styled(Box)(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(10, 1fr)',
    height: '88vh',
    width: '100%',
    gridColumn: '1/-1',
    gridRow: '1/-1',
  }));

  return (
    <Box
      sx={{
        width: { mobile: '100%', tablet: inAuthPage || inUserPage ? '100%' : '80%' },
        height: '88vh',
        display: 'grid',
        position: 'relative',
        gridTemplateColumns: {
          mobile: 'repeat(1, 1fr)',
          tablet: 'repeat(1, 1fr)',
          wideTablet: inAuthPage ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
          laptop: 'repeat(3, 1fr)',
        },
        gridAutoRows: inAuthPage ? 'none' : '220px',
        overflowY: 'auto',
        gap: 3,
      }}>
      {!inAuthPage && !inUserPage && props.children}
      {inAuthPage && <AuthPageWrapper>{props.children}</AuthPageWrapper>}
      {inUserPage && <UserPageWrapper>{props.children}</UserPageWrapper>}
    </Box>
  );
};
