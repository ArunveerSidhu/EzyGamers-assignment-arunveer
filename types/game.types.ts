export interface Cell {
  id: string;
  value: number;
  row: number;
  col: number;
  isMatched: boolean;
  isSelected: boolean;
  isShaking?: boolean;
}

export interface GridState {
  cells: Cell[][];
  filledRows: number;
  totalRows: number;
}

export interface GameState {
  grid: GridState;
  selectedCell: Cell | null;
  matchedCount: number;
  totalCells: number;
  timeRemaining: number;
  isGameOver: boolean;
  isVictory: boolean;
  isPaused: boolean;
}

export interface LevelConfig {
  id: number;
  name: string;
  image: any;
  cols: number;
  initialRows: number;
  totalRows: number;
  maxAddRows: number;
  timeLimit: number;
  pairProbability: number;
  sumTo10Probability: number;
}

