import { Cell, LevelConfig } from "@/types/game.types";

export function generateGrid(levelConfig: LevelConfig): Cell[][] {
  const { cols, totalRows } = levelConfig;
  const grid: Cell[][] = [];

  // Create empty grid first
  for (let row = 0; row < totalRows; row++) {
    const rowCells: Cell[] = [];
    for (let col = 0; col < cols; col++) {
      rowCells.push({
        id: `${row}-${col}`,
        value: 1,
        row,
        col,
        isMatched: false,
        isSelected: false,
      });
    }
    grid.push(rowCells);
  }

  // Fill grid with guaranteed matching pairs
  fillGridWithPairs(grid, levelConfig);
  return grid;
}

// Pick numbers based on difficulty - easier levels get more small numbers
function generateNumber(pairProbability: number, sumTo10Probability: number): number {
  if (pairProbability > 0.6) {
    const weights = [15, 12, 12, 10, 15, 10, 8, 8, 10];
    return weightedRandomNumber(weights);
  } else if (pairProbability > 0.4) {
    const weights = [11, 11, 11, 11, 12, 11, 11, 11, 11];
    return weightedRandomNumber(weights);
  } else {
    const weights = [8, 9, 11, 13, 13, 13, 11, 9, 8];
    return weightedRandomNumber(weights);
  }
}

function weightedRandomNumber(weights: number[]): number {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * total;

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return i + 1;
    }
  }

  return 1;
}

// Fill grid strategically - scatter pairs across visible and hidden rows
function fillGridWithPairs(grid: Cell[][], levelConfig: LevelConfig): void {
  const { cols, totalRows, initialRows, pairProbability, id } = levelConfig;
  
  // Collect visible and hidden cells separately
  const visibleCells: { row: number; col: number }[] = [];
  const hiddenCells: { row: number; col: number }[] = [];
  
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < cols; col++) {
      if (row < initialRows) {
        visibleCells.push({ row, col });
      } else {
        hiddenCells.push({ row, col });
      }
    }
  }
  
  shuffleArray(visibleCells);
  shuffleArray(hiddenCells);
  
  // Progressive difficulty: more hidden pairs for harder levels
  // Level 1: 40% hidden, Level 2: 50% hidden, Level 3: 60% hidden
  const hiddenRatio = 0.3 + (id * 0.1); // 0.4, 0.5, 0.6
  const totalVisibleCells = visibleCells.length;
  const pairsScatteredToHidden = Math.floor((totalVisibleCells / 2) * hiddenRatio);
  const pairsInVisibleArea = Math.floor(totalVisibleCells / 2) - pairsScatteredToHidden;
  
  let hiddenIndex = 0;
  let pairIndex = 0;
  
  // Create pairs
  for (let i = 0; i < visibleCells.length; i += 2) {
    if (i + 1 >= visibleCells.length) break;
    
    const cell1 = visibleCells[i];
    let cell2;
    
    // Decide if this pair should be scattered to hidden area
    if (pairIndex < pairsScatteredToHidden && hiddenIndex < hiddenCells.length) {
      // Scatter one cell to hidden area
      cell2 = hiddenCells[hiddenIndex];
      hiddenIndex++;
    } else {
      // Keep pair in visible area
      cell2 = visibleCells[i + 1];
    }
    
    const useIdenticalPair = Math.random() < pairProbability;
    
    if (useIdenticalPair) {
      const value = Math.floor(Math.random() * 9) + 1;
      grid[cell1.row][cell1.col].value = value;
      grid[cell2.row][cell2.col].value = value;
    } else {
      const value1 = Math.floor(Math.random() * 9) + 1;
      const value2 = 10 - value1;
      if (value2 >= 1 && value2 <= 9) {
        grid[cell1.row][cell1.col].value = value1;
        grid[cell2.row][cell2.col].value = value2;
      } else {
        const value = Math.floor(Math.random() * 9) + 1;
        grid[cell1.row][cell1.col].value = value;
        grid[cell2.row][cell2.col].value = value;
      }
    }
    
    pairIndex++;
  }
  
  // Fill remaining hidden cells with random pairs among themselves
  const remainingHidden = hiddenCells.slice(hiddenIndex);
  for (let i = 0; i < remainingHidden.length - 1; i += 2) {
    const cell1 = remainingHidden[i];
    const cell2 = remainingHidden[i + 1];
    
    const useIdenticalPair = Math.random() < pairProbability;
    
    if (useIdenticalPair) {
      const value = Math.floor(Math.random() * 9) + 1;
      grid[cell1.row][cell1.col].value = value;
      grid[cell2.row][cell2.col].value = value;
    } else {
      const value1 = Math.floor(Math.random() * 9) + 1;
      const value2 = 10 - value1;
      if (value2 >= 1 && value2 <= 9) {
        grid[cell1.row][cell1.col].value = value1;
        grid[cell2.row][cell2.col].value = value2;
      } else {
        const value = Math.floor(Math.random() * 9) + 1;
        grid[cell1.row][cell1.col].value = value;
        grid[cell2.row][cell2.col].value = value;
      }
    }
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

