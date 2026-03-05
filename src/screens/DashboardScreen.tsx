import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Dimensions
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../theme/tokens';
import { Card } from '../components/Card';
import { useDashboard } from '../hooks/useDashboard';

const { width } = Dimensions.get('window');

export const DashboardScreen = () => {
    const {
        salary,
        totalFixed,
        totalDaily,
        available,
        percentage,
        loading,
        refresh
    } = useDashboard();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getProgressColor = () => {
        if (percentage >= 90) return Colors.danger;
        if (percentage >= 75) return Colors.warning;
        return Colors.primary;
    };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refresh} />
            }
        >
            <View style={styles.header}>
                <Text style={styles.greeting}>Resumen Mensual</Text>
                <Text style={styles.date}>Marzo 2026</Text>
            </View>

            <Card style={styles.mainCard}>
                <Text style={styles.cardLabel}>Sueldo Mensual</Text>
                <Text style={styles.salaryAmount}>{formatCurrency(salary)}</Text>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBg}>
                        <View
                            style={[
                                styles.progressBarFill,
                                {
                                    width: `${Math.min(percentage, 100)}%`,
                                    backgroundColor: getProgressColor()
                                }
                            ]}
                        />
                    </View>
                    <View style={styles.progressLabels}>
                        <Text style={styles.progressText}>{percentage.toFixed(1)}% consumido</Text>
                        <Text style={styles.progressText}>{formatCurrency(available)} disponible</Text>
                    </View>
                </View>
            </Card>

            <View style={styles.row}>
                <Card style={styles.halfCard}>
                    <Text style={styles.miniLabel}>Gastos Fijos</Text>
                    <Text style={styles.amountSmall}>{formatCurrency(totalFixed)}</Text>
                </Card>
                <Card style={styles.halfCard}>
                    <Text style={styles.miniLabel}>Gastos Diarios</Text>
                    <Text style={styles.amountSmall}>{formatCurrency(totalDaily)}</Text>
                </Card>
            </View>

            <View style={styles.section}>
                <Text style={Typography.h2}>Próximos Pasos</Text>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        Usa el botón "+" para registrar tus gastos diarios y mantén tu presupuesto bajo control.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.md,
    },
    header: {
        marginVertical: Spacing.lg,
    },
    greeting: {
        ...Typography.h1,
    },
    date: {
        ...Typography.caption,
        color: Colors.textMuted,
    },
    mainCard: {
        padding: Spacing.xl,
        backgroundColor: Colors.surface,
    },
    cardLabel: {
        ...Typography.caption,
        fontWeight: '600',
        marginBottom: Spacing.xs,
    },
    salaryAmount: {
        ...Typography.h1,
        fontSize: 32,
        color: Colors.primary,
    },
    progressContainer: {
        marginTop: Spacing.xl,
    },
    progressBarBg: {
        height: 12,
        backgroundColor: Colors.border,
        borderRadius: Radius.full,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: Radius.full,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.sm,
    },
    progressText: {
        ...Typography.caption,
        fontSize: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.md,
    },
    halfCard: {
        padding: Spacing.md,
    },
    miniLabel: {
        ...Typography.caption,
        fontSize: 12,
        marginBottom: 4,
    },
    amountSmall: {
        ...Typography.body,
        fontWeight: '700',
    },
    section: {
        marginTop: Spacing.xl,
    },
    infoBox: {
        backgroundColor: '#eff6ff',
        padding: Spacing.md,
        borderRadius: Radius.md,
        marginTop: Spacing.sm,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    infoText: {
        ...Typography.caption,
        color: Colors.primary,
    }
});
