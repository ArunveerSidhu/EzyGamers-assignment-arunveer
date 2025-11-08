import { AddRowButton, GameBoard, GameHeader, PauseButton } from "@/components/gamescreen";
import { MuteIcon, UnmuteIcon } from "@/components/icons";
import { GameOverModal, QuitConfirmModal } from "@/components/modals";
import { useMusic } from "@/contexts/MusicContext";
import { useGameLogic, useTimer } from "@/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, NativeScrollEvent, NativeSyntheticEvent, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { isMuted, toggleMute } = useMusic();
    const levelId = Number(params.levelId) || 1;
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [showQuitModal, setShowQuitModal] = useState(false);

    const {
        gameState,
        handleCellPress,
        addRow,
        resetGame,
        pauseGame,
        resumeGame,
        setGameOver,
    } = useGameLogic(levelId);

    const { formatTime, pause, resume, reset } = useTimer(
        120,
        () => setGameOver()
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
        if (gameState.grid.filledRows < gameState.grid.totalRows) {
            addRow();
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
        setIsAtBottom(isBottom);
    };

    const handleBackPress = () => {
        setShowQuitModal(true);
    };

    const handleQuitConfirm = () => {
        setShowQuitModal(false);
        router.back();
    };

    const handleReplay = () => {
        resetGame();
        reset();
        resume();
    };

    const handleQuitFromGameOver = () => {
        router.back();
    };

    const handleNextLevel = () => {
        router.replace(`/Game?levelId=${levelId + 1}`);
    };

    const hasNextLevel = levelId < 3;
    const canAddRows = gameState.grid.filledRows < gameState.grid.totalRows;

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
                    onBackPress={handleBackPress}
                />

                <View className="px-4 mt-14 relative" style={{ maxHeight: 400 }}>
                    <ScrollView 
                        contentContainerStyle={{ alignItems: 'center' }}
                        showsVerticalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        <GameBoard 
                            cells={gameState.grid.cells}
                            filledRows={gameState.grid.filledRows}
                            onCellPress={handleCellPress}
                        />
                    </ScrollView>
                    {!isAtBottom && (
                        <LinearGradient
                            colors={['transparent', 'rgba(0, 0, 0, 0.3)']}
                            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none mx-7"
                        />
                    )}
                </View>

                <View className="px-4 gap-4 flex-row justify-center items-center mt-20">
                    <AddRowButton 
                        onPress={handleAddRow}
                        disabled={!canAddRows}
                    />
                    
                    <PauseButton 
                        onPress={handlePausePress}
                        isPaused={gameState.isPaused}
                    />

                    <TouchableOpacity
                        onPress={toggleMute}
                        className="bg-[#1c2128] rounded-none py-4 px-4 items-center border-2 border-[#40444c] shadow-lg"
                        activeOpacity={0.7}
                    >
                        {isMuted ? (
                            <MuteIcon width={24} height={24} />
                        ) : (
                            <UnmuteIcon width={24} height={24} />
                        )}
                    </TouchableOpacity>
                </View>

                <QuitConfirmModal
                    visible={showQuitModal}
                    onCancel={() => setShowQuitModal(false)}
                    onConfirm={handleQuitConfirm}
                />

                <GameOverModal
                    visible={gameState.isGameOver}
                    isVictory={gameState.isVictory}
                    timeDisplay={formatTime()}
                    onReplay={handleReplay}
                    onQuit={handleQuitFromGameOver}
                    onNextLevel={handleNextLevel}
                    hasNextLevel={hasNextLevel}
                />
            </SafeAreaView>
        </ImageBackground>
    );
}