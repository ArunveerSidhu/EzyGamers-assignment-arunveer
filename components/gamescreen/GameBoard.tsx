import { Cell } from "@/types/game.types";
import { View } from "react-native";
import AnimatedCell from "./AnimatedCell";

interface GameBoardProps {
  cells: Cell[][];
  filledRows: number;
  onCellPress: (cell: Cell) => void;
}

export default function GameBoard({ cells, filledRows, onCellPress }: GameBoardProps) {
  return (
    <View className="bg-[#1c2128] rounded-none overflow-hidden border-2 border-[#40444c] shadow-2xl">
      {cells.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row">
          {row.map((cell) => {
            const isFilled = rowIndex < filledRows;
            const isLastCol = cell.col === row.length - 1;
            const isLastRow = rowIndex === cells.length - 1;
            
            return (
              <AnimatedCell
                key={cell.id}
                cell={cell}
                isFilled={isFilled}
                isLastCol={isLastCol}
                isLastRow={isLastRow}
                onPress={() => onCellPress(cell)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

