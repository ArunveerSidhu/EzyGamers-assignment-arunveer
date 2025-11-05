import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartScreen() {
  return (
    <ImageBackground 
        source={require("@/assets/images/StartScreen/bg.png")} 
        resizeMode="stretch" 
        className="flex-1"
    >
        <SafeAreaView className="flex-1">
            <View className="items-center mt-10">
                <Text className="text-white text-6xl font-star-crush">
                    Numbotron
                </Text>
            </View>
        </SafeAreaView>
    </ImageBackground>
  );
}

