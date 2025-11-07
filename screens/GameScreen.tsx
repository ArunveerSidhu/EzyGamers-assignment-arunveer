import { AddRowButton, GameBoard, PauseButton } from "@/components/gamescreen";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
    // Dummy data for grid - 3 rows of 9 numbers
    const dummyGrid = [
        [5, 3, 7, 2, 8, 1, 4, 6, 9],
        [4, 5, 6, 9, 3, 7, 2, 8, 1],
        [2, 8, 1, 4, 6, 5, 9, 3, 7],
    ];

    return (
        <ImageBackground 
            source={require("@/assets/images/StartScreen/bg.png")} 
            resizeMode="stretch" 
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                {/* Header */}
                <Text className="text-white text-4xl mt-10 text-center font-gothic">
                    chamber of pairs
                </Text>

                {/* Grid Container */}
                <ScrollView 
                    className="flex-1 px-4 mt-8"
                    contentContainerClassName="items-center"
                >
                    <GameBoard 
                        grid={dummyGrid}
                        onCellPress={(value, row, col) => 
                            console.log(`Pressed: ${value} at [${row},${col}]`)
                        }
                    />
                </ScrollView>

                {/* Bottom Buttons */}
                <View className="px-4 pb-10 gap-6 flex-row justify-center items-center">
                    <AddRowButton 
                        onPress={() => console.log('Add row pressed')}
                    />
                    
                    <PauseButton 
                        onPress={() => console.log('Pause pressed')}
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}