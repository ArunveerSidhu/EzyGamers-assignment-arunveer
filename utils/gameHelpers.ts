import { Cell } from "@/types/game.types";

// Check if two cells can match - they need to be next to each other and either identical or sum to 10
export function isValidMatch(cell1: Cell, cell2: Cell, grid?: Cell[][]): boolean {
  if (cell1.id === cell2.id) return false;
  if (cell1.isMatched || cell2.isMatched) return false;
  if (!areAdjacent(cell1, cell2, grid)) return false;
  
  return cell1.value === cell2.value || cell1.value + cell2.value === 10;
}

// Checks if cells can be matched - either directly adjacent or connected through faded cells
export function areAdjacent(cell1: Cell, cell2: Cell, grid?: Cell[][]): boolean {
  const rowDiff = Math.abs(cell1.row - cell2.row);
  const colDiff = Math.abs(cell1.col - cell2.col);
  
  // Direct adjacency (touching cells including diagonals)
  if (rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0)) {
    return true;
  }
  
  // Check if cells are in same row or column with only faded cells between
  if (grid) {
    // Same row - check horizontal connection
    if (cell1.row === cell2.row) {
      return checkPathClear(cell1, cell2, grid, 'horizontal');
    }
    
    // Same column - check vertical connection
    if (cell1.col === cell2.col) {
      return checkPathClear(cell1, cell2, grid, 'vertical');
    }
  }
  
  return false;
}

// Check if path between two cells only has faded (matched) cells
function checkPathClear(cell1: Cell, cell2: Cell, grid: Cell[][], direction: 'horizontal' | 'vertical'): boolean {
  if (direction === 'horizontal') {
    const minCol = Math.min(cell1.col, cell2.col);
    const maxCol = Math.max(cell1.col, cell2.col);
    
    // Check all cells between
    for (let col = minCol + 1; col < maxCol; col++) {
      if (!grid[cell1.row][col].isMatched) {
        return false;
      }
    }
    return true;
  } else {
    const minRow = Math.min(cell1.row, cell2.row);
    const maxRow = Math.max(cell1.row, cell2.row);
    
    // Check all cells between
    for (let row = minRow + 1; row < maxRow; row++) {
      if (!grid[row][cell1.col].isMatched) {
        return false;
      }
    }
    return true;
  }
}

// Find all possible valid matches in the grid
export function findPossibleMatches(grid: Cell[][]): [Cell, Cell][] {
  const matches: [Cell, Cell][] = [];
  const flatCells = grid.flat().filter(cell => !cell.isMatched);

  for (let i = 0; i < flatCells.length; i++) {
    for (let j = i + 1; j < flatCells.length; j++) {
      if (isValidMatch(flatCells[i], flatCells[j], grid)) {
        matches.push([flatCells[i], flatCells[j]]);
      }
    }
  }

  return matches;
}

export function isGameWinnable(grid: Cell[][]): boolean {
  return findPossibleMatches(grid).length > 0;
}

export function areAllCellsMatched(grid: Cell[][], visibleRows: number): boolean {
  for (let row = 0; row < visibleRows && row < grid.length; row++) {
    for (const cell of grid[row]) {
      if (!cell.isMatched) return false;
    }
  }
  return true;
}

export function countMatchedCells(grid: Cell[][], visibleRows: number): number {
  let count = 0;
  for (let row = 0; row < visibleRows && row < grid.length; row++) {
    for (const cell of grid[row]) {
      if (cell.isMatched) count++;
    }
  }
  return count;
}

export function countTotalVisibleCells(grid: Cell[][], visibleRows: number): number {
  let count = 0;
  for (let row = 0; row < visibleRows && row < grid.length; row++) {
    count += grid[row].length;
  }
  return count;
}

