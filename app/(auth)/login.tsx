import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      if (!email.trim() || !password.trim()) {
        setError('Por favor ingresa tu correo y contraseña');
        return;
      }
      
      await signIn(email, password);
    } catch (err) {
      setError('Correo o contraseña inválidos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ChevronLeft color={Colors.white} size={28} />
      </TouchableOpacity>
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bienvenido de nuevo</Text>
        <Text style={styles.headerSubtitle}>Inicia sesión para continuar tu entrenamiento</Text>
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tu.correo@ejemplo.com"
            placeholderTextColor={Colors.neutral[400]}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor={Colors.neutral[400]}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff color={Colors.neutral[500]} size={20} />
              ) : (
                <Eye color={Colors.neutral[500]} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <TouchableOpacity 
          style={styles.forgotPasswordButton}
          onPress={() => {/* Funcionalidad de contraseña olvidada */}}
        >
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.loginButton, (isLoading || !email || !password) && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading || !email || !password}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.footerLinkText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.primary[600],
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 100,
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontFamily: 'Oswald-Bold',
    fontSize: 32,
    color: Colors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[300],
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[900],
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[900],
  },
  passwordToggle: {
    padding: 12,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.secondary[600],
    marginBottom: 16,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  loginButton: {
    backgroundColor: Colors.secondary[500],
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.neutral[300],
  },
  loginButtonText: {
    fontFamily: 'Oswald-SemiBold',
    fontSize: 16,
    color: Colors.white,
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  footerLinkText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.primary[500],
  },
});