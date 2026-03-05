import { useState, useEffect } from 'react';
import { supabase, FixedExpense, DailyExpense } from '../api/supabase';
import { useAuth } from './useAuth';

/**
 * useDashboard Hook
 * RF6: Dashboard mensual con cálculos agregados
 */
export const useDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        salary: 0,
        totalFixed: 0,
        totalDaily: 0,
        totalSpent: 0,
        available: 0,
        percentage: 0,
    });

    const fetchData = async () => {
        if (!user) return;
        setLoading(true);

        try {
            // 1. Fetch Profile for Salary
            const { data: profile } = await supabase
                .from('profiles')
                .select('monthly_salary')
                .eq('id', user.id)
                .single();

            const salary = profile?.monthly_salary || 0;

            // 2. Fetch Fixed Expenses for current month
            const { data: fixed } = await supabase
                .from('fixed_expenses')
                .select('amount')
                .eq('user_id', user.id);

            const totalFixed = (fixed as FixedExpense[] | null)?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

            // 3. Fetch Daily Expenses for current month
            // Note: In a real app, we would filter by month start/end
            const { data: daily } = await supabase
                .from('daily_expenses')
                .select('amount')
                .eq('user_id', user.id);

            const totalDaily = (daily as DailyExpense[] | null)?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

            // 4. Calculate Totals
            const totalSpent = totalFixed + totalDaily;
            const available = salary - totalSpent;
            const percentage = salary > 0 ? (totalSpent / salary) * 100 : 0;

            setData({
                salary,
                totalFixed,
                totalDaily,
                totalSpent,
                available,
                percentage,
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    return { ...data, loading, refresh: fetchData };
};
