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
} from '../../../utils';
import {
  Data,
  KPIProps,
  AreaProps,
  CategoryProps,
  SquadAccordionProps,
  KPIsProps,
} from '../../../interfaces';

function KPI(props: KPIProps) {
  const { title, score, goalScore } = props;
  const [data, setData] = React.useState<Data[]>(dataGenerator(score));
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
  const [max, setMax] = React.useState(
    Math.floor(Math.random() * (4 - 1 + 1)) + 1
  );
  const grids = [];
  const { value, index, score } = props;

  for (let i = 0; i < max; i++) {
    const [goalScore, setGoalScore] = React.useState<number>(
      goalScoreGenerator()
    );
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
  const [score, setScore] = React.useState<number>(scoreGenerator());

  const { name, expanded, handleChange } = props;
  return (
    <Accordion
      expanded={expanded === name}
      onChange={handleChange(name)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography align="left" sx={{ width: '50%' }}>
          {name}
        </Typography>
        <Typography align="right" sx={{ width: '50%' }}>
          <Chip
            label={`Score ${score}`}
            sx={{ backgroundColor: percentageToColor(score) }}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Category score={score} />
      </AccordionDetails>
    </Accordion>
  );
}

export default function KPIs(props: KPIsProps) {
  const { value, index } = props;
  const [expanded, setExpanded] = React.useState<string | false>('N1');
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      {value === index && (
        <Box>
          <SquadAccordion
            name="N5"
            expanded={expanded}
            handleChange={handleChange}
          />
          <SquadAccordion
            name="N4"
            expanded={expanded}
            handleChange={handleChange}
          />
          <SquadAccordion
            name="N3"
            expanded={expanded}
            handleChange={handleChange}
          />
          <SquadAccordion
            name="N2"
            expanded={expanded}
            handleChange={handleChange}
          />
          <SquadAccordion
            name="N1"
            expanded={expanded}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
}
