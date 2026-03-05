import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';
import { supabase } from '../api/supabase';
import { Colors, Spacing, Typography } from '../theme/tokens';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleEmailAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingresa email y contraseña');
            return;
        }

        setLoading(true);
        try {
            if (isRegistering) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                Alert.alert('Éxito', 'Cuenta creada. Revisa tu correo para verificar.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (error: any) {
            Alert.alert('Error de Autenticación', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        Alert.alert('Aviso', 'Inicio con Google requiere configuración adicional de redirect URIs.');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={Typography.h1}>GastosD</Text>
                    <Text style={styles.subtitle}>
                        {isRegistering ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Correo Electrónico"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="tu@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    <Button
                        label={isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                        onPress={handleEmailAuth}
                        loading={loading}
                    />

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>o</Text>
                        <View style={styles.line} />
                    </View>

                    <Button
                        label="Continuar con Google"
                        variant="ghost"
                        onPress={handleGoogleLogin}
                        style={styles.googleBtn}
                    />

                    <Button
                        label={isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                        variant="ghost"
                        onPress={() => setIsRegistering(!isRegistering)}
                        style={styles.switchBtn}
                    />
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
    subtitle: {
        ...Typography.body,
        marginTop: Spacing.sm,
        color: Colors.textMuted,
    },
    form: {
        width: '100%',
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
    },
    googleBtn: {
        marginBottom: Spacing.md,
    },
    switchBtn: {
        marginTop: Spacing.md,
        borderWidth: 0,
    },
});
