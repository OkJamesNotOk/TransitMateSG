import { useWindowDimensions } from 'react-native';

export default function useResponsiveSpacing() {
  // get current screen dimensions
  const { width, height } = useWindowDimensions();

  // calculate horizontal padding
  const screenPaddingWidth = Math.min(
    Math.max(width * 0.04, 12),
    24
  );

  // calculate vertical padding
  const screenPaddingHeight = Math.min(
    Math.max(height * 0.02, 12),
    24
  );

  return {
    screenPaddingWidth,
    screenPaddingHeight,
  };
}