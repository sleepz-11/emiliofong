import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Chrome as Home, Dumbbell, ChartBar as BarChart2, User, Menu } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.secondary[500],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Ejercicios',
          tabBarIcon: ({ color, size }) => (
            <Dumbbell color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <BarChart2 color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color, size }) => (
            <Menu color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    height: Layout.tabBarHeight,
    paddingTop: 10,
    paddingBottom: Layout.bottomSpacing,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    paddingBottom: 4,
  },
});