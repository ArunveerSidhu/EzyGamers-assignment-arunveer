import { Text, TouchableOpacity } from "react-native";

interface AddRowButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export default function AddRowButton({ onPress, disabled = false }: AddRowButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      className={`rounded-xl py-4 items-center border-2 shadow-lg ${
        disabled 
          ? 'bg-gray-500 border-gray-400 opacity-50' 
          : 'bg-green-600 border-green-400'
      }`}
    >
      <Text className="text-white text-xl font-bold">Add Row</Text>
    </TouchableOpacity>
  );
}

