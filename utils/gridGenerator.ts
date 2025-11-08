import { Cell, LevelConfig } from "@/types/game.types";

export function generateGrid(levelConfig: LevelConfig): Cell[][] {
  const { cols, totalRows, pairProbability } = levelConfig;
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

// Fill grid with matching pairs - ensures ALL cells have valid pairs
function fillGridWithPairs(grid: Cell[][], levelConfig: LevelConfig): void {
  const { cols, totalRows, pairProbability } = levelConfig;
  const totalCells = cols * totalRows;
  
  // Collect all cells
  const allCells: { row: number; col: number }[] = [];
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < cols; col++) {
      allCells.push({ row, col });
    }
  }
  
  // Shuffle to randomize pair distribution
  shuffleArray(allCells);
  
  // Create pairs - process cells two at a time
  for (let i = 0; i < allCells.length - 1; i += 2) {
    const cell1 = allCells[i];
    const cell2 = allCells[i + 1];
    
    const useIdenticalPair = Math.random() < pairProbability;
    
    if (useIdenticalPair) {
      // Create identical pair
      const value = Math.floor(Math.random() * 9) + 1;
      grid[cell1.row][cell1.col].value = value;
      grid[cell2.row][cell2.col].value = value;
    } else {
      // Create sum-to-10 pair
      const value1 = Math.floor(Math.random() * 9) + 1;
      const value2 = 10 - value1;
      if (value2 >= 1 && value2 <= 9) {
        grid[cell1.row][cell1.col].value = value1;
        grid[cell2.row][cell2.col].value = value2;
      } else {
        // Fallback to identical pair if sum doesn't work
        const value = Math.floor(Math.random() * 9) + 1;
        grid[cell1.row][cell1.col].value = value;
        grid[cell2.row][cell2.col].value = value;
      }
    }
  }
  
  // Handle odd number of cells (if any)
  if (allCells.length % 2 === 1) {
    const lastCell = allCells[allCells.length - 1];
    // Find any cell with same value to pair with
    const firstCell = allCells[0];
    grid[lastCell.row][lastCell.col].value = grid[firstCell.row][firstCell.col].value;
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

