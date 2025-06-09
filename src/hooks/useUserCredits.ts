
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export const useUserCredits = (user: User | null) => {
  const [remainingRestorations, setRemainingRestorations] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRemainingRestorations(1);
      setLoading(false);
      return;
    }

    fetchUserCredits();
  }, [user]);

  const fetchUserCredits = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_credits')
        .select('remaining_restorations')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user credits:', error);
        // If no credits record exists, create one
        if (error.code === 'PGRST116') {
          await createUserCredits();
        }
      } else if (data) {
        setRemainingRestorations(data.remaining_restorations);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUserCredits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_credits')
        .insert({
          user_id: user.id,
          remaining_restorations: 1,
          total_restorations_used: 0
        })
        .select('remaining_restorations')
        .single();

      if (error) {
        console.error('Error creating user credits:', error);
      } else if (data) {
        setRemainingRestorations(data.remaining_restorations);
      }
    } catch (error) {
      console.error('Error creating credits:', error);
    }
  };

  const deductCredit = async () => {
    if (!user || remainingRestorations <= 0) return false;

    try {
      const currentUsed = await getCurrentUsedCount();
      const { data, error } = await supabase
        .from('user_credits')
        .update({
          remaining_restorations: remainingRestorations - 1,
          total_restorations_used: currentUsed + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select('remaining_restorations')
        .single();

      if (error) {
        console.error('Error deducting credit:', error);
        return false;
      }

      if (data) {
        setRemainingRestorations(data.remaining_restorations);
      }
      return true;
    } catch (error) {
      console.error('Error deducting credit:', error);
      return false;
    }
  };

  const getCurrentUsedCount = async () => {
    if (!user) return 0;

    const { data } = await supabase
      .from('user_credits')
      .select('total_restorations_used')
      .eq('user_id', user.id)
      .single();

    return data?.total_restorations_used || 0;
  };

  return {
    remainingRestorations,
    loading,
    deductCredit,
    refetchCredits: fetchUserCredits
  };
};
