import { LEVEL_CONFIGS } from "@/config/levelConfigs";
import { Cell, GameState, GridState } from "@/types/game.types";
import {
  countMatchedCells,
  countTotalVisibleCells,
  isValidMatch,
} from "@/utils/gameHelpers";
import { generateGrid } from "@/utils/gridGenerator";
import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";

interface UseGameLogicReturn {
  gameState: GameState;
  handleCellPress: (cell: Cell) => void;
  addRow: () => void;
  resetGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setGameOver: () => void;
}

export function useGameLogic(levelId: number): UseGameLogicReturn {
  const levelConfig = LEVEL_CONFIGS[levelId - 1];

  const [gameState, setGameState] = useState<GameState>(() =>
    initializeGame()
  );

  function initializeGame(): GameState {
    const grid = generateGrid(levelConfig);
    const gridState: GridState = {
      cells: grid,
      filledRows: levelConfig.initialRows,
      totalRows: levelConfig.totalRows,
    };
    
    // Total cells to match = ONLY initial visible cells (doesn't increase when adding rows)
    const initialTotalCells = countTotalVisibleCells(grid, levelConfig.initialRows);

    return {
      grid: gridState,
      selectedCell: null,
      matchedCount: 0,
      totalCells: initialTotalCells, // Fixed - doesn't change when adding rows
      timeRemaining: levelConfig.timeLimit,
      isGameOver: false,
      isVictory: false,
      isPaused: false,
    };
  }

  const resetGame = useCallback(() => {
    setGameState(initializeGame());
  }, [levelConfig]);

  const pauseGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const setGameOver = useCallback(() => {
    setGameState((prev) => ({ ...prev, isGameOver: true, isVictory: false }));
  }, []);

  const handleCellPress = useCallback(
    (cell: Cell) => {
      if (gameState.isGameOver || gameState.isPaused || cell.isMatched) {
        return;
      }

      // Haptic feedback on tap
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const { selectedCell, grid } = gameState;

      // First selection
      if (!selectedCell) {
        setGameState((prev) => ({
          ...prev,
          selectedCell: cell,
          grid: {
            ...prev.grid,
            cells: updateCellSelection(prev.grid.cells, cell.id, true),
          },
        }));
        return;
      }

      // Same cell clicked - deselect
      if (selectedCell.id === cell.id) {
        setGameState((prev) => ({
          ...prev,
          selectedCell: null,
          grid: {
            ...prev.grid,
            cells: updateCellSelection(prev.grid.cells, cell.id, false),
          },
        }));
        return;
      }

      // Second selection - check for match
      if (isValidMatch(selectedCell, cell, grid.cells)) {
        // Valid match!
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        setGameState((prev) => {
          const newCells = markCellsAsMatched(
            prev.grid.cells,
            selectedCell.id,
            cell.id
          );
          const newMatchedCount = countMatchedCells(
            newCells,
            prev.grid.filledRows
          );
          // Victory when matched count equals initial total cells (not current visible cells)
          const isVictory = newMatchedCount >= prev.totalCells;

          return {
            ...prev,
            grid: {
              ...prev.grid,
              cells: newCells,
            },
            selectedCell: null,
            matchedCount: newMatchedCount,
            isVictory,
            isGameOver: isVictory,
          };
        });
      } else {
        // Invalid match
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        // Mark cells as shaking
        setGameState((prev) => ({
          ...prev,
          grid: {
            ...prev.grid,
            cells: markCellsAsShaking(prev.grid.cells, selectedCell.id, cell.id),
          },
        }));

        // Clear shake and selection after animation
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            selectedCell: null,
            grid: {
              ...prev.grid,
              cells: clearShakeAndSelections(prev.grid.cells),
            },
          }));
        }, 500);
      }
    },
    [gameState]
  );

  const addRow = useCallback(() => {
    setGameState((prev) => {
      const newFilledRows = Math.min(
        prev.grid.filledRows + levelConfig.maxAddRows,
        prev.grid.totalRows
      );

      if (newFilledRows === prev.grid.filledRows) {
        return prev;
      }

      // totalCells stays the same - only initial cells count for victory
      return {
        ...prev,
        grid: {
          ...prev.grid,
          filledRows: newFilledRows,
        },
        // totalCells NOT updated - victory condition stays at initial cells only
      };
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [levelConfig]);

  // Removed "no moves = game over" logic
  // Game only ends on: victory (all initial cells matched) or timeout

  return {
    gameState,
    handleCellPress,
    addRow,
    resetGame,
    pauseGame,
    resumeGame,
    setGameOver,
  };
}

// Helper functions

function updateCellSelection(
  cells: Cell[][],
  cellId: string,
  isSelected: boolean
): Cell[][] {
  return cells.map((row) =>
    row.map((cell) =>
      cell.id === cellId ? { ...cell, isSelected } : cell
    )
  );
}

function clearAllSelections(cells: Cell[][]): Cell[][] {
  return cells.map((row) =>
    row.map((cell) => ({ ...cell, isSelected: false }))
  );
}

function markCellsAsMatched(
  cells: Cell[][],
  cellId1: string,
  cellId2: string
): Cell[][] {
  return cells.map((row) =>
    row.map((cell) =>
      cell.id === cellId1 || cell.id === cellId2
        ? { ...cell, isMatched: true, isSelected: false }
        : { ...cell, isSelected: false }
    )
  );
}

function markCellsAsShaking(
  cells: Cell[][],
  cellId1: string,
  cellId2: string
): Cell[][] {
  return cells.map((row) =>
    row.map((cell) =>
      cell.id === cellId1 || cell.id === cellId2
        ? { ...cell, isShaking: true }
        : cell
    )
  );
}

function clearShakeAndSelections(cells: Cell[][]): Cell[][] {
  return cells.map((row) =>
    row.map((cell) => ({ ...cell, isSelected: false, isShaking: false }))
  );
}

