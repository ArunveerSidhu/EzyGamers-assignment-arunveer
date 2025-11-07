import { Text, TouchableOpacity } from "react-native";

interface PauseButtonProps {
  onPress: () => void;
  isPaused?: boolean;
}

export default function PauseButton({ onPress, isPaused = false }: PauseButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-yellow-600 rounded-xl py-4 items-center border-2 border-yellow-400 shadow-lg"
    >
      <Text className="text-white text-xl font-bold">
        {isPaused ? 'Resume' : 'Pause'}
      </Text>
    </TouchableOpacity>
  );
}

