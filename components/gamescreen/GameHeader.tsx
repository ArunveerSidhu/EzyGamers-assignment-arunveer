import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface GameHeaderProps {
  levelName: string;
  timeDisplay: string;
  matchedCount: number;
  totalCount: number;
}

export default function GameHeader({
  levelName,
  timeDisplay,
  matchedCount,
  totalCount,
}: GameHeaderProps) {
  const router = useRouter();

  return (
    <View className="px-4 mt-6">
      {/* Level Name */}
      <Text className="text-white text-4xl text-center font-gothic mb-4">
        {levelName}
      </Text>

      {/* Stats Row */}
      <View className="flex-row justify-between items-center bg-[#1c2128]/80 rounded-xl px-4 py-3 border border-[#40444c]">
        {/* Timer */}
        <View className="flex-1 items-center">
          <Text className="text-gray-400 text-xs mb-1">TIME</Text>
          <Text className="text-white text-2xl font-bold font-luckiest">
            {timeDisplay}
          </Text>
        </View>

        {/* Divider */}
        <View className="w-px h-10 bg-[#40444c]" />

        {/* Progress */}
        <View className="flex-1 items-center">
          <Text className="text-gray-400 text-xs mb-1">MATCHED</Text>
          <Text className="text-white text-2xl font-bold font-luckiest">
            {matchedCount}/{totalCount}
          </Text>
        </View>

        {/* Divider */}
        <View className="w-px h-10 bg-[#40444c]" />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-red-400 text-lg font-bold">← BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

