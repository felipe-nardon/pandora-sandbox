import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { OverviewProps } from '../../interfaces';

export default function Overview(props: OverviewProps) {
  const { value, index } = props;

  if (value === index) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Overview</Typography>
      </Box>
    );
  }
  return <Box />;
}
