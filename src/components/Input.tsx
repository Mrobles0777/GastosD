import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle
} from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme/tokens';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    onBlur,
    onFocus,
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputWrapper,
                isFocused && styles.inputFocused,
                !!error ? styles.inputError : null
            ]}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.textMuted}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
        width: '100%',
    },
    label: {
        ...Typography.caption,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    inputWrapper: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: Spacing.md,
    },
    inputFocused: {
        borderColor: Colors.primary,
    },
    inputError: {
        borderColor: Colors.danger,
    },
    input: {
        ...Typography.body,
        color: Colors.text,
        width: '100%',
    },
    errorText: {
        ...Typography.caption,
        color: Colors.danger,
        marginTop: Spacing.xs,
        fontSize: 12,
    },
});
