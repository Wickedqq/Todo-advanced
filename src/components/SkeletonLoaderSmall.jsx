import { Skeleton, Stack } from '@mui/material';
import React from 'react';

export const SkeletonLoaderSmall = () => {
  return (
    <Stack spacing={1} flexDirection="column" justifyContent="space-between">
      <Skeleton variant="rectangular" width={300} height={120} />
      <br />
      <Skeleton variant="rectangular" width={300} height={25} />
      <Skeleton variant="rectangular" width={300} height={25} />
    </Stack>
  );
};
