import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    TouchableOpacity
} from 'react-native';
import { supabase } from '../api/supabase';
import { Colors, Spacing, Typography } from '../theme/tokens';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

/**
 * Login & Register Screen
 * Handles Auth flow with Supabase
 */
export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const validateInputs = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingresa todos los campos.');
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Por favor ingresa un correo válido.');
            return false;
        }
        return true;
    };

    const handleAuth = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            if (isRegistering) {
                // Sign Up
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: email.split('@')[0], // Default name
                        }
                    }
                });

                if (error) throw error;

                if (data.session) {
                    Alert.alert('Éxito', 'Cuenta creada e sesión iniciada.');
                } else {
                    Alert.alert('Éxito', 'Revisa tu correo para confirmar tu registro.');
                }
            } else {
                // Sign In
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        Alert.alert('Info', 'Google Login requiere configuración adicional en el Dashboard de Supabase y Google Cloud.');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>$</Text>
                    </View>
                    <Text style={styles.title}>GastosD</Text>
                    <Text style={styles.subtitle}>
                        {isRegistering ? 'Crea tu cuenta para empezar' : 'Bienvenido de vuelta'}
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Correo Electrónico"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="ejemplo@correo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />

                    <Input
                        label="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                        autoComplete="password"
                    />

                    <Button
                        label={isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
                        onPress={handleAuth}
                        loading={loading}
                        style={styles.mainButton}
                    />

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>O continuar con</Text>
                        <View style={styles.line} />
                    </View>

                    <Button
                        label="Google"
                        variant="ghost"
                        onPress={handleGoogleLogin}
                        style={styles.googleButton}
                    />

                    <TouchableOpacity
                        onPress={() => setIsRegistering(!isRegistering)}
                        style={styles.toggleContainer}
                    >
                        <Text style={styles.toggleText}>
                            {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
                            <Text style={styles.toggleLink}>
                                {isRegistering ? 'Inicia sesión' : 'Regístrate'}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: Spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl * 2,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
        // Shadow para el logo
        elevation: 4,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    logoText: {
        fontSize: 40,
        fontWeight: '800',
        color: Colors.white,
    },
    title: {
        ...Typography.h1,
        fontSize: 28,
    },
    subtitle: {
        ...Typography.body,
        marginTop: Spacing.xs,
        color: Colors.textMuted,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    mainButton: {
        marginTop: Spacing.md,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.xl,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.border,
    },
    dividerText: {
        marginHorizontal: Spacing.md,
        color: Colors.textMuted,
        ...Typography.caption,
    },
    googleButton: {
        marginBottom: Spacing.lg,
    },
    toggleContainer: {
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    toggleText: {
        ...Typography.body,
        color: Colors.textMuted,
        fontSize: 14,
    },
    toggleLink: {
        color: Colors.primary,
        fontWeight: '700',
    },
});
