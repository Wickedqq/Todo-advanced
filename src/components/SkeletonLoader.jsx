import React from 'react';
import { Skeleton, Stack } from '@mui/material';

export const SkeletonLoader = () => {
  return (
    <Stack sx={{ width: '280px' }} flexDirection="row" spacing={1} justifyContent="space-evenly">
      <Skeleton variant="rectangular" width={240} height={180} />
      <Stack spacing={1} flexDirection="column" justifyContent="space-evenly">
        <Skeleton variant="rectangular" width={30} height={30} />
        <Skeleton variant="rectangular" width={30} height={30} />
        <br />
        <Skeleton variant="rectangular" width={30} height={30} />
        <Skeleton variant="rectangular" width={30} height={30} />
      </Stack>
    </Stack>
  );
};
