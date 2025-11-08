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

// Fill grid with matching pairs - mix of horizontal, vertical, and scattered placements
function fillGridWithPairs(grid: Cell[][], levelConfig: LevelConfig): void {
  const { cols, totalRows, pairProbability } = levelConfig;
  const totalCells = cols * totalRows;
  const used = new Set<string>();
  
  // Create pairs with varied placements based on difficulty
  const horizontalPairRatio = pairProbability; // Easy levels favor obvious horizontal pairs
  
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < cols; col++) {
      const cellKey = `${row}-${col}`;
      if (used.has(cellKey)) continue;
      
      const useIdenticalPair = Math.random() < pairProbability;
      let pairPlaced = false;
      
      // Try different pair placements based on difficulty
      const placements = [];
      
      // Horizontal pair (always available if space)
      if (col < cols - 1 && !used.has(`${row}-${col + 1}`)) {
        placements.push({ r: row, c: col + 1, type: 'horizontal' });
      }
      
      // Vertical pair (available for medium/hard levels)
      if (row < totalRows - 1 && !used.has(`${row + 1}-${col}`) && Math.random() > horizontalPairRatio * 0.5) {
        placements.push({ r: row + 1, c: col, type: 'vertical' });
      }
      
      // Diagonal pair (for harder levels)
      if (row < totalRows - 1 && col < cols - 1 && !used.has(`${row + 1}-${col + 1}`) && Math.random() > horizontalPairRatio) {
        placements.push({ r: row + 1, c: col + 1, type: 'diagonal' });
      }
      
      if (placements.length > 0) {
        // Pick a random placement
        const placement = placements[Math.floor(Math.random() * placements.length)];
        
        if (useIdenticalPair) {
          const value = Math.floor(Math.random() * 9) + 1;
          grid[row][col].value = value;
          grid[placement.r][placement.c].value = value;
        } else {
          const value1 = Math.floor(Math.random() * 9) + 1;
          const value2 = 10 - value1;
          if (value2 >= 1 && value2 <= 9) {
            grid[row][col].value = value1;
            grid[placement.r][placement.c].value = value2;
          } else {
            const value = Math.floor(Math.random() * 9) + 1;
            grid[row][col].value = value;
            grid[placement.r][placement.c].value = value;
          }
        }
        
        used.add(cellKey);
        used.add(`${placement.r}-${placement.c}`);
        pairPlaced = true;
      }
      
      // If no pair could be placed, fill with random and it will pair with another cell
      if (!pairPlaced && !used.has(cellKey)) {
        const value = Math.floor(Math.random() * 9) + 1;
        grid[row][col].value = value;
        used.add(cellKey);
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

