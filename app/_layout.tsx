import { MusicProvider } from "@/contexts/MusicContext";
import { useFontsLoader } from "@/hooks/useFontsLoader";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "../global.css";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded, error } = useFontsLoader();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Hide Android nav bar
    NavigationBar.setVisibilityAsync("hidden");

    // Hide status bar smoothly after mount
    setTimeout(() => {
      StatusBar.setHidden(true, "fade");
    }, 300);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <MusicProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MusicProvider>
  );
}
