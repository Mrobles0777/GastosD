import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Wrapper
 * Configured with AsyncStorage for persistent sessions in Expo/React Native
 */

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

/**
 * Interface and Types for GastosD
 */

export type Profile = {
    id: string;
    email: string;
    full_name: string | null;
    monthly_salary: number;
    currency: string;
    alert_sent_month: string | null; // YYYY-MM
};

export type FixedExpense = {
    id: string;
    user_id: string;
    category: 'arriendo' | 'luz' | 'agua' | 'internet' | 'otros';
    label: string | null;
    amount: number;
    month: string; // ISO Date string (first of month)
};

export type DailyExpense = {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    category: string | null;
    date: string; // ISO Date string
    created_at: string;
};
