import { Cell } from "@/types/game.types";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

interface AnimatedCellProps {
  cell: Cell;
  isFilled: boolean;
  isLastCol: boolean;
  isLastRow: boolean;
  onPress: () => void;
}

export default function AnimatedCell({
  cell,
  isFilled,
  isLastCol,
  isLastRow,
  onPress,
}: AnimatedCellProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (cell.isShaking) {
      translateX.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 50 }),
          withTiming(8, { duration: 50 }),
          withTiming(-8, { duration: 50 }),
          withTiming(8, { duration: 50 }),
          withTiming(0, { duration: 50 })
        ),
        1,
        false
      );
    }
  }, [cell.isShaking]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableOpacity
      activeOpacity={isFilled ? 0.7 : 1}
      onPress={() => isFilled && onPress()}
      className={`w-12 h-12 items-center justify-center border-r border-b border-[#40444c] ${
        !isFilled ? "bg-[#0a0e12]" : cell.isSelected ? "bg-yellow-600" : ""
      } ${cell.isMatched ? "bg-[#1c2128] opacity-40" : ""}`}
      style={{
        borderRightWidth: isLastCol ? 0 : 1,
        borderBottomWidth: isLastRow ? 0 : 1,
      }}
      disabled={cell.isMatched || !isFilled}
    >
      {isFilled && (
        <Animated.View style={animatedStyle}>
          <Text
            className={`font-luckiest text-2xl mt-2 ${
              cell.isMatched
                ? "text-gray-500"
                : cell.isSelected
                ? "text-white"
                : "text-white"
            }`}
          >
            {cell.value}
          </Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}

