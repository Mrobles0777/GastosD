import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useAuth } from './src/hooks/useAuth';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { Colors } from './src/theme/tokens';

/**
 * App Entry Point
 * Handles basic routing between Auth and Protected screens
 */
export default function App() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {isAuthenticated ? (
                // Placeholder for Dashboard/Main Navigator
                <View style={styles.placeholder}>
                    {/* Dashboard implementation will go here */}
                </View>
            ) : (
                <LoginScreen />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    placeholder: {
        flex: 1,
    }
});
