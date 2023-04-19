import * as React from 'react';
import {
  Tabs,
  Tab,
  Chip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  Box,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  dataGenerator,
  goalScoreGenerator,
  percentageToColor,
  scoreGenerator,
  scoreVariation,
} from '../../utils';
import {
  Data,
  KPIProps,
  AreaProps,
  CategoryProps,
  SquadAccordionProps,
  MaturityProps,
} from '../../interfaces';

function KPI(props: KPIProps) {
  const { title, score, goalScore } = props;
  const [data] = React.useState<Data[]>(dataGenerator(score));
  return (
    <Box sx={{ width: 300, height: 300 }}>
      <Typography variant="h5" align="center">
        {title}
      </Typography>
      <ResponsiveContainer height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 100]} />
          <Bar
            dataKey="value"
            fill={percentageToColor(score)}
            label={{ fill: 'black', fontSize: 16 }}
          />
          <ReferenceLine
            y={goalScore}
            stroke="#e50091"
            strokeDasharray="5"
            label={
              <Label value="Goal" fill="#e50091" position="insideBottomLeft" />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

function Area(props: AreaProps) {
  const [max] = React.useState(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
  const grids = [];
  const { value, index, score } = props;

  for (let i = 0; i < max; i++) {
    const [goalScore] = React.useState<number>(goalScoreGenerator());
    grids.push(
      <Grid item>
        <KPI title={`KPI ${i + 1}`} score={score} goalScore={goalScore} />
      </Grid>
    );
  }

  if (value === index) {
    return (
      <Grid
        container
        spacing={0}
        justifyContent="space-around"
        alignItems="center"
      >
        {grids}
      </Grid>
    );
  }
  return <Box />;
}

function Category(props: CategoryProps) {
  const [value, setValue] = React.useState(0);
  const { score } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const arquiteturaScoreVariation = scoreVariation(score);
  const engenhariaScoreVariation = scoreVariation(score);
  const operaçõesScoreVariation = scoreVariation(score);
  const siScoreVariation = scoreVariation(score);
  return (
    <Box sx={{ border: 1, borderColor: 'divider' }}>
      <Tabs
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
      >
        <Tab
          label="Arquitetura"
          sx={{
            backgroundColor: percentageToColor(arquiteturaScoreVariation),
          }}
        />
        <Tab
          label="Engenharia"
          sx={{
            backgroundColor: percentageToColor(engenhariaScoreVariation),
          }}
        />
        <Tab
          label="Operações"
          sx={{
            backgroundColor: percentageToColor(operaçõesScoreVariation),
          }}
        />
        <Tab
          label="SI"
          sx={{
            backgroundColor: percentageToColor(siScoreVariation),
          }}
        />
      </Tabs>
      <Area value={value} index={0} score={arquiteturaScoreVariation} />
      <Area value={value} index={1} score={engenhariaScoreVariation} />
      <Area value={value} index={2} score={operaçõesScoreVariation} />
      <Area value={value} index={3} score={siScoreVariation} />
    </Box>
  );
}

function SquadAccordion(props: SquadAccordionProps) {
  const [score] = React.useState<number>(scoreGenerator());
  const [goalScore] = React.useState<number>(
    goalScoreGenerator({ min: score })
  );

  const { name, expanded, handleChange } = props;

  const disable = ['Pink', 'Gold'].includes(name);
  return (
    <Accordion
      expanded={expanded === name}
      onChange={handleChange(name)}
      TransitionProps={{ unmountOnExit: true }}
      sx={{ backgroundColor: '#f9f9f9' }}
      disabled={disable}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography align="left" sx={{ width: '50%' }}>
          {name}
        </Typography>
        <Typography align="right" sx={{ width: '50%' }}>
          <Stack
            display={disable ? 'none' : 'flex'}
            justifyContent="right"
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Chip
              label={`Score ${score}`}
              sx={{ backgroundColor: percentageToColor(score) }}
            />
            <Chip
              label={`Goal ${goalScore}`}
              sx={{ backgroundColor: '#e50091', color: 'white' }}
            />
          </Stack>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Category score={score} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function Maturity(props: MaturityProps) {
  const { value, index } = props;
  const [score] = React.useState<number>(scoreGenerator());
  const [goalScore] = React.useState<number>(goalScoreGenerator());
  const [expanded, setExpanded] = React.useState<string | false>('Bronze');
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      {value === index && (
        <Box>
          <Paper elevation={1} sx={{ padding: 3, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h5" display="flex" justifyContent="center">
              Score total
            </Typography>
            <Stack
              display="flex"
              justifyContent="center"
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Chip
                label={`Score ${score}`}
                sx={{ backgroundColor: percentageToColor(score) }}
              />
              <Chip
                label={`Goal ${goalScore}`}
                sx={{ backgroundColor: '#e50091', color: 'white' }}
              />
            </Stack>
          </Paper>
          <Divider sx={{ padding: 1 }} />
          <SquadAccordion
            name="Pink"
            expanded={expanded}
            handleChange={handleChange}
          />
          <SquadAccordion
            name="Gold"
            expanded={expanded}
            handleChange={handleChange}
          />
          <SquadAccordion
            name="Silver"
            expanded={expanded}
            handleChange={handleChange}
          />
          <SquadAccordion
            name="Bronze"
            expanded={expanded}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
}
