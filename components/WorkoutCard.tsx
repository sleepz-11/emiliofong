import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Clock, Dumbbell } from 'lucide-react-native';

interface WorkoutCardProps {
  workout: {
    id: string;
    title: string;
    description: string;
    duration: number;
    exercises: number;
    image: string;
    level: string;
    category: string;
  };
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: workout.image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{workout.level}</Text>
        </View>
        <Text style={styles.title}>{workout.title}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Clock color={Colors.white} size={16} />
            <Text style={styles.statText}>{workout.duration} min</Text>
          </View>
          <View style={styles.stat}>
            <Dumbbell color={Colors.white} size={16} />
            <Text style={styles.statText}>{workout.exercises} exercises</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  levelBadge: {
    backgroundColor: Colors.secondary[500],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.white,
  },
  title: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 18,
    color: Colors.white,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.white,
    marginLeft: 4,
  },
});