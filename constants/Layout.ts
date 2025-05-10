import { Dimensions, Platform, StatusBar } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Standard 8-point spacing system
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Status bar height (platform-specific)
const STATUS_BAR_HEIGHT = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
  default: 0,
});

// Tab bar height
const TAB_BAR_HEIGHT = Platform.select({
  ios: 88,
  default: 64,
});

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  spacing,
  statusBarHeight: STATUS_BAR_HEIGHT,
  tabBarHeight: TAB_BAR_HEIGHT,
  bottomSpacing: Platform.OS === 'ios' ? 34 : 16,
};