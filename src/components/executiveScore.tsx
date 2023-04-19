import * as React from 'react';
import {
  Chip,
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Switch,
  FormControlLabel,
  Stack,
  Divider,
  Paper,
  Grid,
  Button,
} from '@mui/material';
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
import { Tree, TreeNode } from 'react-organizational-chart';
import {
  getSample,
  goalScoreGenerator,
  percentageToColor,
  scoreGenerator,
} from '../utils';
import {
  ExecutiveData,
  MaturityScoreProps,
  CustomTreeProps,
  Data,
} from '../interfaces';
import { faker } from '@faker-js/faker';
import Squad from './squad';

faker.locale = 'pt_BR';

function dataGenerator(): ExecutiveData[] {
  const tree = {
    role: 'Diretor',
    childrenCount: 6,
    childrenProps: {
      role: 'Superintendente / Gerente Executivo / Gererente',
      childrenCount: 2,
      childrenProps: {
        role: 'Coordenador / Spec II',
        childrenCount: 2,
        childrenProps: {
          role: 'Spec',
          childrenCount: 0,
          stop: true,
        },
      },
    },
  };

  const [data] = React.useState<ExecutiveData[]>([walkTree(tree)]);
  return data;
}

function walkTree(node: {
  role: string;
  childrenCount: number;
  childrenProps: any;
  stop?: boolean;
}) {
  let role: string = node.role;

  if (role.includes(' / ')) {
    role = getSample(role.split(' / '));
  }
  const item: ExecutiveData = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    role: role,
    goalScore: goalScoreGenerator(),
    children: [],
  };
  if (node.stop) {
    item.score = scoreGenerator();
    item.squadName = `Squad ${faker.music.genre()}`;
  }

  for (let i = 0; i < node.childrenCount; i++) {
    item.children.push(walkTree(node.childrenProps));
  }

  return item;
}

function MaturityScore(props: MaturityScoreProps) {
  const { data, score, goalScore } = props;

  return (
    <Paper elevation={0} sx={{ p: 1, width: 350, height: 250 }}>
      <ResponsiveContainer height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="name" interval="preserveStartEnd" />
          <YAxis domain={[0, 100]} width={26} tickCount={6} />
          <Bar
            dataKey="value"
            fill={percentageToColor((score / goalScore) * 100)}
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
    </Paper>
  );
}

function chartDataGenerator(executiveData: ExecutiveData): Data[] {
  if (executiveData.children.length) {
    const data: Data[] = [];
    let scoreSum = 0;
    executiveData.children.forEach((item) => {
      chartDataGenerator(item);
      data.push({ name: item.name, value: item.score || 0 });
      scoreSum += item.score || 0;
    });
    executiveData.score = Math.floor(scoreSum / data.length);
    return data;
  } else {
    return [
      {
        name: executiveData.squadName || 'Undefined',
        value: executiveData.score || 0,
      },
    ];
  }
}

function loadSquadContent() {
  console.log(111);
}

function CustomTree(props: CustomTreeProps) {
  const { data, expanded, handleChange } = props;
  const content: any[] = [];

  data?.map((item: ExecutiveData) => {
    const chartData = chartDataGenerator(item);
    const { score, goalScore, name, role, children } = item;

    let cardActions = null;
    let nextChildren = null;
    if (children?.length) {
      cardActions = (
        <CardActions sx={{ pt: 0 }}>
          <Typography align="center" sx={{ width: '100%' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={expanded.includes(name)}
                  onChange={handleChange(name)}
                />
              }
              labelPlacement="start"
              label="Details"
            />
          </Typography>
        </CardActions>
      );
    } else {
      cardActions = (
        <CardActions sx={{ pt: 0 }}>
          <Typography align="center" sx={{ width: '100%' }}>
            <Button variant="outlined" onClick={loadSquadContent}>
              Go to Squad
            </Button>
          </Typography>
        </CardActions>
      );
    }
    if (expanded.includes(name)) {
      nextChildren = (
        <Collapse in={expanded.includes(name)} unmountOnExit>
          <CustomTree
            data={children}
            expanded={expanded}
            handleChange={handleChange}
          />
        </Collapse>
      );
    }

    content.push(
      <TreeNode
        key={name}
        label={
          <Card sx={{ minWidth: 400 }}>
            <CardHeader title={name} subheader={role} />
            <CardContent sx={{ p: 0 }}>
              <Box display="flex" justifyContent="center">
                <Paper
                  elevation={0}
                  sx={{ width: 350, padding: 1, backgroundColor: '#f9f9f9' }}
                >
                  <Stack
                    display="flex"
                    justifyContent="space-evenly"
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Chip
                      label={`Score ${score}`}
                      sx={{
                        backgroundColor: percentageToColor(
                          ((score || 0) / goalScore) * 100
                        ),
                      }}
                    />
                    <Chip
                      label={`Goal ${goalScore}`}
                      sx={{ backgroundColor: '#e50091', color: 'white' }}
                    />
                  </Stack>
                </Paper>
              </Box>
              <Box display="flex" justifyContent="center">
                <MaturityScore
                  data={chartData}
                  score={score || 0}
                  goalScore={goalScore}
                />
              </Box>
            </CardContent>
            {cardActions}
          </Card>
        }
        children={nextChildren}
      />
    );
  });
  return <Box display="flex">{content}</Box>;
}

export default function ExecutiveScore() {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const handleChange = (id: string) => () => {
    if (expanded.includes(id)) {
      setExpanded((current) => current.filter((item) => item !== id));
    } else {
      setExpanded((previous) => [...previous, id]);
    }
  };
  const data = dataGenerator();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h4">Scores TI</Typography>
      </Grid>
      <Grid item>
        <Tree
          lineWidth="4px"
          lineColor="#e50091"
          lineBorderRadius="10px"
          label={
            <CustomTree
              data={data}
              expanded={expanded}
              handleChange={handleChange}
            />
          }
        >
          {}
        </Tree>
      </Grid>
    </Grid>
  );
}

// sx={{
//   backgroundColor: 'primary.dark',
//   '&:hover': {
//     backgroundColor: 'primary.main',
//     opacity: [0.9, 0.8, 0.7],
//   },
// }}
