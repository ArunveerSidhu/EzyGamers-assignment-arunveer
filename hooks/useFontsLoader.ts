import { useFonts } from "expo-font";

export const useFontsLoader = () => {
  const [loaded, error] = useFonts({
    StarCrush: require("../assets/fonts/star-crush.ttf"),
  });

  return { loaded, error };
};

