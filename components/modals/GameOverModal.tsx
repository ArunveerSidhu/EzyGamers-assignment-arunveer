import { Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal";

interface GameOverModalProps {
  visible: boolean;
  isVictory: boolean;
  timeDisplay: string;
  onReplay: () => void;
  onQuit: () => void;
}

export default function GameOverModal({ 
  visible, 
  isVictory, 
  timeDisplay, 
  onReplay, 
  onQuit 
}: GameOverModalProps) {
  return (
    <Modal visible={visible}>
      <View className="bg-[#1c2128] border-2 border-[#40444c] rounded-none p-6 w-80">
        <Text className={`text-5xl font-luckiest text-center mb-4 ${isVictory ? 'text-green-400' : 'text-red-400'}`}>
          {isVictory ? 'VICTORY!' : 'GAME OVER'}
        </Text>
        
        {isVictory && (
          <Text className="text-white text-xl text-center mb-6">
            Time: {timeDisplay}
          </Text>
        )}

        {!isVictory && (
          <Text className="text-gray-400 text-base text-center mb-6">
            Better luck next time!
          </Text>
        )}

        <View className="gap-3">
          <TouchableOpacity
            onPress={onReplay}
            className="bg-green-600 py-3 px-6 border-2 border-green-700 rounded-none"
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-luckiest text-center">
              REPLAY
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onQuit}
            className="bg-[#40444c] py-3 px-6 border-2 border-[#50555c] rounded-none"
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-luckiest text-center">
              QUIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

