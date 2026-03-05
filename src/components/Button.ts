import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle
} from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme/tokens';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

/**
 * Atomic Button Component
 * Handles variants and loading states as per reglas.md
 */
export const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style
}) => {
    const getButtonStyle = (): ViewStyle => {
        switch (variant) {
            case 'secondary':
                return styles.secondary;
            case 'danger':
                return styles.danger;
            case 'ghost':
                return styles.ghost;
            default:
                return styles.primary;
        }
    };

    const getLabelStyle = (): TextStyle => {
        if (variant === 'ghost') return styles.labelGhost;
        return styles.label;
    };

    return (
        <TouchableOpacity 
      style= { [styles.base, getButtonStyle(), style, (disabled || loading) && styles.disabled]}
    onPress = { onPress }
    disabled = { disabled || loading
}
activeOpacity = { 0.7}
    >
    {
        loading?(
        <ActivityIndicator color = { variant === 'ghost' ? Colors.primary : Colors.white} />
      ) : (
    <Text style= { [getLabelStyle(), disabled && styles.labelDisabled]} > { label } </Text>
      )}
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    base: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        minHeight: 48,
    },
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    danger: {
        backgroundColor: Colors.danger,
    },
    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    disabled: {
        opacity: 0.5,
    },
    label: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.white,
    },
    labelGhost: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.primary,
    },
    labelDisabled: {
        color: '#cbd5e1',
    },
});
