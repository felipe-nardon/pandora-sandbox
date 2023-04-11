interface CommonsProps {
  index: number;
  value: number;
}

export interface Data {
  name: string;
  value: number;
}

// Tab interfaces
export interface OverviewProps extends CommonsProps {}

export interface DocsProps extends CommonsProps {}

export interface TestProps extends CommonsProps {}

export interface KPIsProps extends CommonsProps {}

// Squad interfaces
export interface SquadAccordionProps {
  name: string;
  expanded: string | false;
  handleChange: Function;
}

export interface CategoryProps {
  score: number;
}

export interface AreaProps extends CommonsProps {
  score: number;
}

export interface KPIProps {
  score: number;
  goalScore: number;
  title: string;
}

// Score interfaces

export interface CustomTreeProps {
  data: ExecutiveData[];
  expanded: string[];
  handleChange: Function;
}

export interface ScoreKPIProps {
  data: Data[];
  score: number;
  goalScore: number;
}

export interface ExecutiveData {
  name: string;
  role: string;
  score?: number;
  goalScore: number;
  squadName?: string;
  children: ExecutiveData[];
  collapsed?: boolean;
}
