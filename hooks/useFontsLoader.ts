import { useFonts } from "expo-font";

export const useFontsLoader = () => {
  const [loaded, error] = useFonts({
    StarCrush: require("../assets/fonts/star-crush.ttf"),
    Gothic: require("../assets/fonts/gothic-byte.ttf"),
  });

  return { loaded, error };
};

