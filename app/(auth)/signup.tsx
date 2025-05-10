import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function SignupScreen() {
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    try {
      setError(null);
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError('Por favor completa todos los campos');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      
      await signUp(name, email, password);
    } catch (err) {
      setError('No se pudo crear la cuenta');
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
        <Text style={styles.headerTitle}>Crear Cuenta</Text>
        <Text style={styles.headerSubtitle}>Regístrate para comenzar tu entrenamiento</Text>
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Juan Pérez"
            placeholderTextColor={Colors.neutral[400]}
          />
        </View>
        
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
              placeholder="Crea una contraseña"
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
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirma tu contraseña"
            placeholderTextColor={Colors.neutral[400]}
            secureTextEntry={!showPassword}
          />
        </View>
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <TouchableOpacity 
          style={[
            styles.signupButton, 
            (isLoading || !name || !email || !password || !confirmPassword) && styles.signupButtonDisabled
          ]}
          onPress={handleSignup}
          disabled={isLoading || !name || !email || !password || !confirmPassword}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.signupButtonText}>REGISTRARSE</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.footerLinkText}>Iniciar sesión</Text>
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
  signupButton: {
    backgroundColor: Colors.secondary[500],
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  signupButtonDisabled: {
    backgroundColor: Colors.neutral[300],
  },
  signupButtonText: {
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