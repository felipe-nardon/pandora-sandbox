import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { TestProps } from '../../../interfaces';

export default function Test(props: TestProps) {
  const { value, index } = props;

  if (value === index) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Test</Typography>
      </Box>
    );
  }
  return;
}
