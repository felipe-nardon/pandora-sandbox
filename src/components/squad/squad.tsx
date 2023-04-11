import * as React from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import KPIs from './tabs/kpis';
import Test from './tabs/test';
import Overview from './tabs/overview';
import Docs from './tabs/docs';

export default function Squad() {
  const [value, setValue] = React.useState(2);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" display="flex" justifyContent="center">
        Squad Pudim
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" />
          <Tab label="Docs" />
          <Tab label="KPIs" />
          <Tab label="Test" />
        </Tabs>
      </Box>
      <Overview value={value} index={0} />
      <Docs value={value} index={1} />
      <KPIs value={value} index={2} />
      <Test value={value} index={3} />
    </Box>
  );
}
