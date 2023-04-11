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
  goalScoreGenerator,
  percentageToColor,
  scoreGenerator,
} from '../utils';
import {
  ExecutiveData,
  ScoreKPIProps,
  CustomTreeProps,
  Data,
} from '../interfaces';
import { faker } from '@faker-js/faker';

faker.locale = 'pt_BR';

function walkTree(node) {
  const [goalScore, setGoalScoreA] = React.useState<number>(
    goalScoreGenerator()
  );

  const randomName = `${faker.name.firstName()} ${faker.name.lastName()}`;

  const item: ExecutiveData = {
    name: randomName,
    role: node.role,
    goalScore: goalScore,
    children: [],
  };

  if (node.stop) {
    const [score, setScore] = React.useState<number>(scoreGenerator());
    item.score = score;
    item.squadName = 'Squad X';
  }

  if (node.childrenCount) {
    item.children = walkTree(node.childrenProps);
  }

  return [item];
}

function dataGenerator(): ExecutiveData[] {
  const tree = {
    role: 'Diretor',
    childrenCount: 2,
    childrenProps: [
      {
        role: 'Superintendente',
        childrenCount: 1,
        childrenProps: [
          {
            role: 'Gerente Executivo',
            childrenCount: 0,
            childrenProps: [],
            stop: true,
          },
        ],
      },
    ],
  };

  return walkTree(tree);

  // const [scoreA, setScoreA] = React.useState<number>(scoreGenerator());
  // const [scoreB, setScoreB] = React.useState<number>(scoreGenerator());

  // const [goalScoreA, setGoalScoreA] = React.useState<number>(
  //   goalScoreGenerator()
  // );
  // const [goalScoreB, setGoalScoreB] = React.useState<number>(
  //   goalScoreGenerator()
  // );
  // const [goalScoreC, setGoalScoreC] = React.useState<number>(
  //   goalScoreGenerator()
  // );
  // const [goalScoreD, setGoalScoreD] = React.useState<number>(
  //   goalScoreGenerator()
  // );
  // const [goalScoreE, setGoalScoreE] = React.useState<number>(
  //   goalScoreGenerator()
  // );

  // return [
  //   {
  //     name: 'Felipe Ávila',
  //     role: 'Diretor',
  //     goalScore: goalScoreA,
  //     children: [
  //       {
  //         name: 'Alex Scarelli',
  //         role: 'Superintendente',
  //         goalScore: goalScoreB,
  //         children: [
  //           {
  //             name: 'Lucia Shiraichi',
  //             role: 'Gerente Executivo',
  //             goalScore: goalScoreC,
  //             children: [
  //               {
  //                 name: 'Gerente TBD',
  //                 role: 'Gerente',
  //                 goalScore: goalScoreD,
  //                 children: [
  //                   {
  //                     name: 'Jean Meira',
  //                     role: 'Spec II',
  //                     goalScore: goalScoreE,
  //                     children: [
  //                       {
  //                         name: 'Luiz Martins',
  //                         role: 'Spec',
  //                         score: scoreA,
  //                         goalScore: goalScoreA,
  //                         squadName: 'Squad A',
  //                         children: [],
  //                       },
  //                       {
  //                         name: 'Luana Waitemam',
  //                         role: 'Spec',
  //                         score: scoreB,
  //                         goalScore: goalScoreB,
  //                         squadName: 'Squad A',
  //                         children: [],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
}

function ScoreKPI(props: ScoreKPIProps) {
  const { data, score, goalScore } = props;

  return (
    <Paper elevation={0} sx={{ p: 1, width: 350, height: 250 }}>
      <ResponsiveContainer height="100%">
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
    }
    // if (expanded.includes(name)) {
    nextChildren = (
      <Collapse in={true} unmountOnExit>
        <CustomTree
          data={children}
          expanded={expanded}
          handleChange={handleChange}
        />
      </Collapse>
    );
    // }

    content.push(
      <TreeNode
        key={name}
        label={
          <Card sx={{ minWidth: 400 }}>
            <CardHeader title={name} subheader={role} />
            <CardContent sx={{ p: 0 }}>
              <Paper
                elevation={1}
                sx={{ p: 1, m: 1, backgroundColor: '#f9f9f9' }}
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
                    sx={{ backgroundColor: percentageToColor(score) }}
                  />
                  <Chip
                    label={`Goal ${goalScore}`}
                    sx={{ backgroundColor: '#e50091', color: 'white' }}
                  />
                </Stack>
              </Paper>
              <Box display="flex" justifyContent="center">
                <ScoreKPI
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
  return <Box sx={{ display: 'flex' }}>{content}</Box>;
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
    <Box display="flex" justifyContent="center">
      <Tree
        lineWidth="4px"
        lineColor="#e50091"
        lineBorderRadius="10px"
        label={<Typography variant="h4">Scores TI</Typography>}
        children={
          <CustomTree
            data={data}
            expanded={expanded}
            handleChange={handleChange}
          />
        }
      />
    </Box>
  );
}

// sx={{
//   backgroundColor: 'primary.dark',
//   '&:hover': {
//     backgroundColor: 'primary.main',
//     opacity: [0.9, 0.8, 0.7],
//   },
// }}
