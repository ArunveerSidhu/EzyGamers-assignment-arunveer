import { Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal";

interface GameOverModalProps {
  visible: boolean;
  isVictory: boolean;
  timeDisplay: string;
  onReplay: () => void;
  onQuit: () => void;
  onNextLevel?: () => void;
  hasNextLevel?: boolean;
}

export default function GameOverModal({ 
  visible, 
  isVictory, 
  timeDisplay, 
  onReplay, 
  onQuit,
  onNextLevel,
  hasNextLevel = false
}: GameOverModalProps) {
  return (
    <Modal visible={visible}>
      <View className="bg-[#1c2128] border-2 border-[#40444c] rounded-none p-6 w-80">
        <Text className={`text-5xl font-luckiest text-center mb-4 ${isVictory ? 'text-green-400' : 'text-red-400'}`}>
          {isVictory ? 'VICTORY!' : 'GAME OVER'}
        </Text>
        
        {isVictory && (
          <Text className="text-white text-xl font-star-crush text-center mb-6">
            Time: {timeDisplay}
          </Text>
        )}

        {!isVictory && (
          <Text className="text-gray-400 font-star-crush text-xl text-center mb-6">
            Better luck next time!
          </Text>
        )}

        <View className="gap-3">
          {isVictory && hasNextLevel && onNextLevel && (
            <TouchableOpacity
              onPress={onNextLevel}
              className="bg-[#1c2128] py-3 px-6 border-2 border-[#40444c] rounded-none"
              activeOpacity={0.7}
            >
              <Text className="text-white text-lg font-star-crush text-center">
                NEXT LEVEL
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onReplay}
            className="bg-[#1c2128] py-3 px-6 border-2 border-[#40444c] rounded-none"
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-star-crush text-center">
              REPLAY
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onQuit}
            className="bg-[#40444c] py-3 px-6 border-2 border-[#50555c] rounded-none"
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-star-crush text-center">
              QUIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

