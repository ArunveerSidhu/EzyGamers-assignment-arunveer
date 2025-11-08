import { AddRowButton, GameBoard, GameHeader, PauseButton } from "@/components/gamescreen";
import { useGameLogic, useTimer } from "@/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
    const params = useLocalSearchParams();
    const levelId = Number(params.levelId) || 1;

    const {
        gameState,
        handleCellPress,
        addRow,
        resetGame,
        pauseGame,
        resumeGame,
    } = useGameLogic(levelId);

    const { formatTime, pause, resume, reset } = useTimer(
        120,
        () => console.log("Time's up!")
    );

    useEffect(() => {
        resume();
    }, []);

    useEffect(() => {
        if (gameState.isPaused || gameState.isGameOver) {
            pause();
        } else {
            resume();
        }
    }, [gameState.isPaused, gameState.isGameOver]);

    const handlePausePress = () => {
        if (gameState.isPaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    };

    const handleAddRow = () => {
        if (gameState.grid.visibleRows < gameState.grid.totalRows) {
            addRow();
        }
    };

    const canAddRows = gameState.grid.visibleRows < gameState.grid.totalRows;

    return (
        <ImageBackground 
            source={require("@/assets/images/StartScreen/bg.png")} 
            resizeMode="stretch" 
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <GameHeader 
                    levelName={gameState.grid.cells.length > 0 ? 
                        ["Chamber Of Pairs", "Hall Of Tens", "Dungeon Of Fate"][levelId - 1] 
                        : "Loading..."}
                    timeDisplay={formatTime()}
                    matchedCount={gameState.matchedCount}
                    totalCount={gameState.totalCells}
                />

                <ScrollView 
                    className="flex-1 px-4 mt-6"
                    contentContainerClassName="items-center"
                >
                    <GameBoard 
                        cells={gameState.grid.cells}
                        visibleRows={gameState.grid.visibleRows}
                        onCellPress={handleCellPress}
                    />
                </ScrollView>

                {gameState.isVictory && (
                    <View className="absolute inset-0 items-center justify-center bg-black/70">
                        <Text className="text-green-400 text-5xl font-bold mb-4">
                            VICTORY! 🎉
                        </Text>
                        <Text className="text-white text-2xl">
                            Time: {formatTime()}
                        </Text>
                    </View>
                )}

                {gameState.isGameOver && !gameState.isVictory && (
                    <View className="absolute inset-0 items-center justify-center bg-black/70">
                        <Text className="text-red-400 text-5xl font-bold mb-4">
                            GAME OVER 😢
                        </Text>
                        <Text className="text-white text-2xl">
                            Try Again!
                        </Text>
                    </View>
                )}

                <View className="px-4 pb-10 gap-6 flex-row justify-center items-center">
                    <AddRowButton 
                        onPress={handleAddRow}
                        disabled={!canAddRows}
                    />
                    
                    <PauseButton 
                        onPress={handlePausePress}
                        isPaused={gameState.isPaused}
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}