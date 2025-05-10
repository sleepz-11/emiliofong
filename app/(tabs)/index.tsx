import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Clock, ChevronRight, Dumbbell, Award } from 'lucide-react-native';
import WorkoutCard from '@/components/WorkoutCard';
import { workouts } from '@/data/workouts';

export default function HomeScreen() {
  const { user } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(20));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const currentHour = new Date().getHours();
  let greeting = 'Good evening';
  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{ 
                uri: user?.profilePicture || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300' 
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <Animated.View 
          style={[
            styles.todayWorkoutCard, 
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.workoutCardContent}>
            <View style={styles.workoutCardHeader}>
              <Clock color={Colors.white} size={20} />
              <Text style={styles.workoutCardHeaderText}>TODAY'S WORKOUT</Text>
            </View>
            <Text style={styles.workoutCardTitle}>Full Body Power</Text>
            <View style={styles.workoutCardStats}>
              <View style={styles.workoutCardStat}>
                <Dumbbell color={Colors.white} size={16} />
                <Text style={styles.workoutCardStatText}>8 exercises</Text>
              </View>
              <View style={styles.workoutCardStat}>
                <Clock color={Colors.white} size={16} />
                <Text style={styles.workoutCardStatText}>40 min</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>START WORKOUT</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
            style={styles.workoutCardBackground}
          />
          <View style={styles.workoutCardOverlay} />
        </Animated.View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suggested Workouts</Text>
            <TouchableOpacity style={styles.sectionHeaderButton}>
              <Text style={styles.sectionHeaderButtonText}>See All</Text>
              <ChevronRight color={Colors.primary[500]} size={16} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.workoutsList}
          >
            {workouts.slice(0, 3).map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
          </View>
          
          <View style={styles.statCards}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Award color={Colors.primary[500]} size={24} />
              </View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, styles.secondaryIcon]}>
                <Clock color={Colors.secondary[500]} size={24} />
              </View>
              <Text style={styles.statValue}>320</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statIconContainer, styles.accentIcon]}>
                <Dumbbell color={Colors.accent[600]} size={24} />
              </View>
              <Text style={styles.statValue}>85</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  userName: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 24,
    color: Colors.primary[600],
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.primary[500],
  },
  todayWorkoutCard: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  workoutCardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  workoutCardOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 36, 99, 0.7)',
  },
  workoutCardContent: {
    padding: 20,
    position: 'relative',
    zIndex: 10,
    height: '100%',
    justifyContent: 'space-between',
  },
  workoutCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutCardHeaderText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.white,
    marginLeft: 8,
  },
  workoutCardTitle: {
    fontFamily: 'Oswald-Bold',
    fontSize: 28,
    color: Colors.white,
    marginTop: 8,
  },
  workoutCardStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  workoutCardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutCardStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.white,
    marginLeft: 6,
  },
  startButton: {
    backgroundColor: Colors.secondary[500],
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 14,
    color: Colors.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  sectionHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 4,
  },
  workoutsList: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  statsSection: {
    marginBottom: 40,
  },
  statCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    backgroundColor: Colors.primary[50],
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryIcon: {
    backgroundColor: Colors.secondary[50],
  },
  accentIcon: {
    backgroundColor: Colors.accent[50],
  },
  statValue: {
    fontFamily: 'Oswald-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
  },
});