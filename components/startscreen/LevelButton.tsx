import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

interface LevelButtonProps {
  levelName: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
}

export default function LevelButton({ levelName, imageSource, onPress }: LevelButtonProps) {
    return (
        <TouchableOpacity 
            className="w-full"
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Image
                source={require("@/assets/images/StartScreen/border3.png")}
                className="h-20 w-full"
                resizeMode="stretch"
            />
            
            <View className="flex flex-row bg-[#1c2128] rounded-b-lg w-full h-24 items-center justify-start gap-4 px-4 py-4 border-b-2 border-l-2 border-r-2 border-[#40444c]">
                <Image
                    source={imageSource}
                    className="h-full w-20"
                    resizeMode="contain"
                />

                <Text className="text-[#cfcbc5] text-3xl font-star-crush tracking-wider flex-1 flex-shrink uppercase">
                    {levelName}
                </Text>
            </View>
        </TouchableOpacity>
    );
}