import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.container,
        animation: 'fade',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary[600],
  },
});