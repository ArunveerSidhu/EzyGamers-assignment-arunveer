import { AddIcon } from "@/components/icons";
import { TouchableOpacity } from "react-native";

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
      className="rounded-none py-4 px-4 items-center border-2 shadow-lg bg-[#1c2128] border-[#40444c]"
    >
     <AddIcon width={24} height={24} fill={disabled ? "#4a4a4a" : "#fff"} />
    </TouchableOpacity>
  );
}

