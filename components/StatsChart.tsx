import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

interface StatsChartProps {
  data: Array<{
    day: string;
    value: number;
  }>;
}

export default function StatsChart({ data }: StatsChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Calculate bar height as percentage of max value
  const getBarHeight = (value: number) => {
    return (value / maxValue) * 150;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View style={styles.barLabelContainer}>
              <Text style={styles.barValue}>{item.value}</Text>
            </View>
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: getBarHeight(item.value),
                    backgroundColor: item.value === maxValue 
                      ? Colors.secondary[500] 
                      : Colors.primary[400]
                  }
                ]} 
              />
            </View>
            <Text style={styles.barDay}>{item.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barLabelContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  barValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.neutral[700],
  },
  barWrapper: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
  },
  bar: {
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary[400],
  },
  barDay: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[600],
    marginTop: 8,
  },
});