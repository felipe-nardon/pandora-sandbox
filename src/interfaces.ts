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

export interface MaturityProps extends CommonsProps {}

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
  loadSquadMenu: Function;
}

export interface MaturityScoreProps {
  data: Data[];
  score: number;
  goalScore: number;
}

export interface ExecutiveScoreProps {
  loadSquadMenu: Function;
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
