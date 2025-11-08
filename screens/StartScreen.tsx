import { LevelButton } from "@/components/startscreen";
import { LEVELS } from "@/levels";
import { useRouter } from "expo-router";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartScreen() {
  const router = useRouter();
  const handleLevelPress = (levelId: number) => {
    router.push(`/Game?levelId=${levelId}`);
  };

  return (
    <ImageBackground 
      source={require("@/assets/images/StartScreen/bg.png")} 
      resizeMode="stretch" 
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="items-center mt-10 px-5">
          <Text className="text-[#D46A2E] text-6xl font-gothic text-center leading-tight">
            Numbo-Tron
          </Text>
        </View>
        
        <ScrollView className="mt-20 px-5" contentContainerClassName="items-center gap-6">
          {LEVELS.map((level) => (
            <LevelButton
              key={level.id}
              levelName={level.name}
              imageSource={level.image}
              onPress={() => handleLevelPress(level.id)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

