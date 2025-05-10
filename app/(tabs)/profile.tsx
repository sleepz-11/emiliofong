import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { User, Settings, Bell, Heart, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color={Colors.neutral[700]} size={24} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ 
              uri: user?.profilePicture || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300' 
            }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>720</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, styles.bellIcon]}>
                  <Bell color={Colors.white} size={16} />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[400] }}
                thumbColor={Colors.white}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, styles.darkModeIcon]}>
                  <Settings color={Colors.white} size={16} />
                </View>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[400] }}
                thumbColor={Colors.white}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.settingsCard}>
            <MenuItem 
              icon={<User color={Colors.white} size={16} />} 
              iconColor={Colors.primary[500]} 
              title="Personal Information" 
            />
            
            <View style={styles.divider} />
            
            <MenuItem 
              icon={<Heart color={Colors.white} size={16} />} 
              iconColor={Colors.secondary[500]} 
              title="Health Information" 
            />
            
            <View style={styles.divider} />
            
            <MenuItem 
              icon={<Lock color={Colors.white} size={16} />} 
              iconColor={Colors.accent[600]} 
              title="Privacy & Security" 
            />
            
            <View style={styles.divider} />
            
            <MenuItem 
              icon={<HelpCircle color={Colors.white} size={16} />} 
              iconColor={Colors.success[500]} 
              title="Help & Support" 
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={signOut}
        >
          <LogOut color={Colors.secondary[500]} size={20} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ icon, iconColor, title }) {
  return (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor }]}>
          {icon}
        </View>
        <Text style={styles.settingText}>{title}</Text>
      </View>
      <ChevronRight color={Colors.neutral[400]} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Oswald-Bold',
    fontSize: 28,
    color: Colors.neutral[800],
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.primary[500],
  },
  profileName: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
  },
  editProfileButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginVertical: 24,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.neutral[200],
  },
  statValue: {
    fontFamily: 'Oswald-Bold',
    fontSize: 22,
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[700],
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: Colors.primary[500],
  },
  bellIcon: {
    backgroundColor: Colors.secondary[500],
  },
  darkModeIcon: {
    backgroundColor: Colors.primary[600],
  },
  settingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 16,
    borderRadius: 12,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.secondary[500],
    marginLeft: 8,
  },
});