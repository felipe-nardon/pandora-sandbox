import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { DocsProps } from '../../../interfaces';

export default function Docs(props: DocsProps) {
  const { value, index } = props;

  if (value === index) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Docs</Typography>
      </Box>
    );
  }
  return;
}
