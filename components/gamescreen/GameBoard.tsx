import { Text, TouchableOpacity, View } from "react-native";

interface GameBoardProps {
  grid: number[][];
  onCellPress?: (value: number, row: number, col: number) => void;
}

export default function GameBoard({ grid, onCellPress }: GameBoardProps) {
  return (
    <View className="bg-[#1c2128] rounded-none overflow-hidden border-2 border-[#40444c] shadow-2xl">
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row">
          {row.map((cell, cellIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${cellIndex}`}
              activeOpacity={0.7}
              onPress={() => onCellPress?.(cell, rowIndex, cellIndex)}
              className="w-11 h-11 items-center justify-center border-r border-b border-[#40444c]"
              style={{
                borderRightWidth: cellIndex === row.length - 1 ? 0 : 1,
                borderBottomWidth: rowIndex === grid.length - 1 ? 0 : 1,
              }}
            >
              <Text className="text-white font-luckiest text-2xl mt-2">{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

