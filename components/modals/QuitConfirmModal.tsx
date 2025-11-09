import { Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal";

interface QuitConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function QuitConfirmModal({ visible, onCancel, onConfirm }: QuitConfirmModalProps) {
  return (
    <Modal visible={visible} onClose={onCancel}>
      <View className="bg-[#1c2128] border-2 border-[#40444c] rounded-none p-6 w-80">
        <Text className="text-white text-2xl font-luckiest text-center mb-6">
          QUIT GAME?
        </Text>
        
        <Text className="text-gray-400 text-base text-center mb-6">
          Are you sure you want to quit? Your progress will be lost.
        </Text>

        <View className="gap-3">
          <TouchableOpacity
            onPress={onConfirm}
            className="bg-[#1c2128] py-3 px-6 border-2 border-[#40444c] rounded-none"
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-star-crush text-center">
              YES, QUIT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onCancel}
            className="bg-[#40444c] py-3 px-6 border-2 border-[#50555c] rounded-none"
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-star-crush text-center">
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}