import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Clock, Dumbbell, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { Exercise } from '@/data/exercises';

interface WorkoutListItemProps {
  workout: {
    id: string;
    title: string;
    description: string;
    duration: number;
    exercises: string[];
    image: string;
    level: string;
    category: string;
  };
}

export default function WorkoutListItem({ workout }: WorkoutListItemProps) {
  const handleWorkoutPress = () => {
    router.push({
      pathname: '/(tabs)/workout-details',
      params: { id: workout.id }
    });
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return Colors.success[500];
      case 'Intermedio':
        return Colors.accent[500];
      case 'Avanzado':
        return Colors.secondary[500];
      default:
        return Colors.primary[500];
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleWorkoutPress}>
      <Image source={{ uri: workout.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{workout.title}</Text>
          <View style={[styles.levelBadge, { backgroundColor: getLevelBadgeColor(workout.level) }]}>
            <Text style={styles.levelText}>{workout.level}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {workout.description}
        </Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Clock color={Colors.neutral[600]} size={14} />
            <Text style={styles.statText}>{workout.duration} min</Text>
          </View>
          <View style={styles.stat}>
            <Dumbbell color={Colors.neutral[600]} size={14} />
            <Text style={styles.statText}>{workout.exercises.length} ejercicios</Text>
          </View>
        </View>
      </View>
      <ChevronRight color={Colors.neutral[400]} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  levelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.white,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
    marginLeft: 4,
  },
});