import { LevelConfig } from "@/types/game.types";

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 1,
    name: "Chamber Of Pairs",
    image: require("@/assets/images/StartScreen/level-1.png"),
    cols: 8,
    initialRows: 3,
    totalRows: 8,
    maxAddRows: 2,
    timeLimit: 120,
    pairProbability: 0.70, // 70% identical pairs (easier)
    sumTo10Probability: 0.30, // 30% sum to 10
  },
  {
    id: 2,
    name: "Hall Of Tens",
    image: require("@/assets/images/StartScreen/level-2.png"),
    cols: 8,
    initialRows: 4,
    totalRows: 10,
    maxAddRows: 2,
    timeLimit: 120,
    pairProbability: 0.50, // 50/50 split (medium)
    sumTo10Probability: 0.50,
  },
  {
    id: 3,
    name: "Dungeon Of Fate",
    image: require("@/assets/images/StartScreen/level-3.png"),
    cols: 8,
    initialRows: 5,
    totalRows: 12,
    maxAddRows: 3,
    timeLimit: 120,
    pairProbability: 0.35, // 35% pairs, 65% sum-to-10 (harder)
    sumTo10Probability: 0.65,
  },
];

