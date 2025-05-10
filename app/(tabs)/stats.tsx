import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import StatsChart from '@/components/StatsChart';
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  Flame,
  ChevronRight
} from 'lucide-react-native';

const weeklyStats = [
  { day: 'Mon', value: 20 },
  { day: 'Tue', value: 45 },
  { day: 'Wed', value: 35 },
  { day: 'Thu', value: 60 },
  { day: 'Fri', value: 25 },
  { day: 'Sat', value: 50 },
  { day: 'Sun', value: 10 },
];

export default function StatsScreen() {
  const currentStreakDays = 5;
  const totalWorkouts = 24;
  const totalMinutes = 720;
  const totalCalories = 4320;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Stats</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <Text style={styles.streakTitle}>Current Streak</Text>
            <Calendar color={Colors.primary[500]} size={20} />
          </View>
          <Text style={styles.streakValue}>{currentStreakDays} days</Text>
          <Text style={styles.streakMessage}>Keep going strong!</Text>
        </View>
        
        <View style={styles.statsCards}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Dumbbell color={Colors.primary[500]} size={20} />
            </View>
            <Text style={styles.statValue}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Clock color={Colors.secondary[500]} size={20} />
            </View>
            <Text style={styles.statValue}>{totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Flame color={Colors.accent[600]} size={20} />
            </View>
            <Text style={styles.statValue}>{totalCalories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>
        
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Activity</Text>
            <TouchableOpacity style={styles.chartFilterButton}>
              <Text style={styles.chartFilterText}>This Week</Text>
              <ChevronRight color={Colors.primary[500]} size={16} />
            </TouchableOpacity>
          </View>
          
          <StatsChart data={weeklyStats} />
        </View>
        
        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight color={Colors.primary[500]} size={16} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.historyList}>
            <HistoryItem 
              title="Upper Body Strength" 
              date="Today" 
              duration="45 min" 
              calories={280} 
            />
            <HistoryItem 
              title="Core Blast" 
              date="Yesterday" 
              duration="30 min" 
              calories={210} 
            />
            <HistoryItem 
              title="Leg Day" 
              date="2 days ago" 
              duration="50 min" 
              calories={320} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HistoryItem({ title, date, duration, calories }) {
  return (
    <View style={styles.historyItem}>
      <View style={styles.historyItemLeft}>
        <View style={styles.workoutIconContainer}>
          <Dumbbell color={Colors.white} size={16} />
        </View>
        <View>
          <Text style={styles.historyItemTitle}>{title}</Text>
          <Text style={styles.historyItemDate}>{date}</Text>
        </View>
      </View>
      <View style={styles.historyItemRight}>
        <View style={styles.historyItemStat}>
          <Clock color={Colors.neutral[500]} size={14} />
          <Text style={styles.historyItemStatText}>{duration}</Text>
        </View>
        <View style={styles.historyItemStat}>
          <Flame color={Colors.secondary[500]} size={14} />
          <Text style={styles.historyItemStatText}>{calories} cal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Oswald-Bold',
    fontSize: 28,
    color: Colors.neutral[800],
  },
  streakCard: {
    backgroundColor: Colors.white,
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[700],
  },
  streakValue: {
    fontFamily: 'Oswald-Bold',
    fontSize: 36,
    color: Colors.primary[600],
    marginBottom: 4,
  },
  streakMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  statsCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
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
    backgroundColor: Colors.neutral[100],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Oswald-Bold',
    fontSize: 20,
    color: Colors.neutral[900],
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
  },
  chartSection: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  chartFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartFilterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 4,
  },
  historySection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 4,
  },
  historyList: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  historyItemDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  historyItemRight: {
    alignItems: 'flex-end',
  },
  historyItemStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyItemStatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[700],
    marginLeft: 4,
  },
});