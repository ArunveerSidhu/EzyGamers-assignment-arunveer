import { Cell } from "@/types/game.types";
import { Text, TouchableOpacity, View } from "react-native";

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
            
            return (
              <TouchableOpacity
                key={cell.id}
                activeOpacity={isFilled ? 0.7 : 1}
                onPress={() => isFilled && onCellPress(cell)}
                className={`w-12 h-12 items-center justify-center border-r border-b border-[#40444c] ${
                  !isFilled ? 'bg-[#0a0e12]' : cell.isSelected ? 'bg-yellow-600' : ''
                } ${cell.isMatched ? 'bg-[#1c2128] opacity-40' : ''}`}
                style={{
                  borderRightWidth: cell.col === row.length - 1 ? 0 : 1,
                  borderBottomWidth: rowIndex === cells.length - 1 ? 0 : 1,
                }}
                disabled={cell.isMatched || !isFilled}
              >
                {isFilled && (
                  <Text 
                    className={`font-luckiest text-2xl mt-2 ${
                      cell.isMatched ? 'text-gray-500' : cell.isSelected ? 'text-white' : 'text-white'
                    }`}
                  >
                    {cell.value}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

