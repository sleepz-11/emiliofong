import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Instagram, Facebook, Twitter, Youtube, Globe, Mail, MessageCircle } from 'lucide-react-native';

const socialLinks = [
  {
    name: 'Instagram',
    icon: <Instagram color={Colors.white} size={24} />,
    color: '#E1306C',
    url: 'https://instagram.com',
    followers: '250K+'
  },
  {
    name: 'Facebook',
    icon: <Facebook color={Colors.white} size={24} />,
    color: '#1877F2',
    url: 'https://facebook.com',
    followers: '180K+'
  },
  {
    name: 'Twitter',
    icon: <Twitter color={Colors.white} size={24} />,
    color: '#1DA1F2',
    url: 'https://twitter.com',
    followers: '120K+'
  },
  {
    name: 'YouTube',
    icon: <Youtube color={Colors.white} size={24} />,
    color: '#FF0000',
    url: 'https://youtube.com',
    followers: '500K+'
  },
  {
    name: 'Website',
    icon: <Globe color={Colors.white} size={24} />,
    color: Colors.primary[600],
    url: 'https://gympro-fitness.com'
  }
];

const trainers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Strength & Conditioning',
    image: 'https://images.pexels.com/photos/5045088/pexels-photo-5045088.jpeg?auto=compress&cs=tinysrgb&w=500',
    instagram: 'sarah_fitness'
  },
  {
    id: '2',
    name: 'Mike Thompson',
    specialty: 'Bodybuilding',
    image: 'https://images.pexels.com/photos/6551136/pexels-photo-6551136.jpeg?auto=compress&cs=tinysrgb&w=500',
    instagram: 'mike_muscle'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    specialty: 'Yoga & Flexibility',
    image: 'https://images.pexels.com/photos/8170225/pexels-photo-8170225.jpeg?auto=compress&cs=tinysrgb&w=500',
    instagram: 'emma_yoga'
  }
];

export default function SocialScreen() {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>FOLLOW US</Text>
            <Text style={styles.bannerSubtitle}>Stay connected with GymPro</Text>
          </View>
        </View>
        
        <View style={styles.socialLinksContainer}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.socialLinkCard, { backgroundColor: link.color }]}
              onPress={() => openLink(link.url)}
            >
              <View style={styles.socialLinkIcon}>
                {link.icon}
              </View>
              <Text style={styles.socialLinkName}>{link.name}</Text>
              {link.followers && (
                <Text style={styles.socialLinkFollowers}>{link.followers}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Trainers</Text>
          <Text style={styles.sectionSubtitle}>Connect with our professional trainers</Text>
          
          {trainers.map((trainer) => (
            <View key={trainer.id} style={styles.trainerCard}>
              <Image source={{ uri: trainer.image }} style={styles.trainerImage} />
              <View style={styles.trainerInfo}>
                <Text style={styles.trainerName}>{trainer.name}</Text>
                <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
                <View style={styles.trainerActions}>
                  <TouchableOpacity 
                    style={[styles.trainerButton, styles.messageButton]}
                    onPress={() => {/* Message functionality */}}
                  >
                    <MessageCircle color={Colors.white} size={16} />
                    <Text style={styles.trainerButtonText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.trainerButton, styles.followButton]}
                    onPress={() => openLink(`https://instagram.com/${trainer.instagram}`)}
                  >
                    <Instagram color={Colors.white} size={16} />
                    <Text style={styles.trainerButtonText}>Follow</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Get in Touch</Text>
          <Text style={styles.contactDescription}>
            Have questions or need support? Our team is here to help you achieve your fitness goals.
          </Text>
          
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => openLink('mailto:support@gympro.com')}
          >
            <Mail color={Colors.white} size={20} />
            <Text style={styles.contactButtonText}>Email Us</Text>
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Oswald-Bold',
    fontSize: 28,
    color: Colors.neutral[800],
  },
  bannerContainer: {
    height: 180,
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 36, 99, 0.7)',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bannerTitle: {
    fontFamily: 'Oswald-Bold',
    fontSize: 28,
    color: Colors.white,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
  },
  socialLinkCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  socialLinkIcon: {
    marginBottom: 12,
  },
  socialLinkName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
    marginBottom: 4,
  },
  socialLinkFollowers: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 16,
  },
  trainerCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  trainerImage: {
    width: 100,
    height: 140,
  },
  trainerInfo: {
    flex: 1,
    padding: 16,
  },
  trainerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  trainerSpecialty: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 12,
  },
  trainerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trainerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    flex: 0.48,
  },
  messageButton: {
    backgroundColor: Colors.primary[500],
  },
  followButton: {
    backgroundColor: Colors.secondary[500],
  },
  trainerButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.white,
    marginLeft: 6,
  },
  contactSection: {
    backgroundColor: Colors.primary[600],
    borderRadius: 16,
    padding: 24,
    margin: 20,
    marginBottom: 40,
  },
  contactTitle: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 24,
    color: Colors.white,
    marginBottom: 8,
  },
  contactDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[100],
    marginBottom: 16,
    lineHeight: 22,
  },
  contactButton: {
    backgroundColor: Colors.secondary[500],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  contactButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
    marginLeft: 8,
  },
});