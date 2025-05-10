import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary[800], Colors.primary[600]]}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
            style={styles.logoBackground}
          />
          <View style={styles.logoOverlay} />
          <Text style={styles.logoText}>FITPRO</Text>
          <Text style={styles.tagline}>Tu Compañero de Entrenamiento</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.buttonPrimary}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.buttonPrimaryText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buttonSecondary}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={styles.buttonSecondaryText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
    width: 240,
    height: 240,
    borderRadius: 120,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  logoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 36, 99, 0.7)',
  },
  logoText: {
    fontFamily: 'Oswald-Bold',
    fontSize: 42,
    color: Colors.white,
    letterSpacing: 2,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.accent[500],
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
  buttonPrimary: {
    backgroundColor: Colors.secondary[500],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonPrimaryText: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 18,
    color: Colors.white,
    letterSpacing: 1,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  buttonSecondaryText: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 18,
    color: Colors.white,
    letterSpacing: 1,
  },
});