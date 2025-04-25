/**
  * Learn more about light and dark modes:
  * https://docs.expo.dev/guides/color-schemes/
  */
 
import Constants from "@/app/constants";
import { useColorScheme } from '@/app/hooks/useColorScheme';

export function useThemeColor(
  colorName: keyof typeof Constants.colors.light & keyof typeof Constants.colors.dark
) {
  const theme = useColorScheme() ?? 'light';

  return Constants.colors[theme][colorName];
}