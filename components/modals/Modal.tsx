import { Pressable, Modal as RNModal } from "react-native";

interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ visible, onClose, children }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 bg-black/70 items-center justify-center px-6"
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

