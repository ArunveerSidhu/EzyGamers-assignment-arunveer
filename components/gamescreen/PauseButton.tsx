import { TouchableOpacity } from "react-native";
import { PauseIcon, ResumeIcon } from "../icons";


interface PauseButtonProps {
  onPress: () => void;
  isPaused?: boolean;
}

export default function PauseButton({ onPress, isPaused = false }: PauseButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-[#1c2128] rounded-none py-4 px-4 items-center border-2 border-[#40444c] shadow-lg"
    >
     {isPaused ? <ResumeIcon width={24} height={24} /> : <PauseIcon width={24} height={24} fill="#fff" />}
    </TouchableOpacity>
  );
}

