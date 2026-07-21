import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfile, fetchWallet, fetchServices, fetchService, executeGoal, fetchTopup } from '@/services/api';
import type { Execution } from '@/types/api';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAgentId() {
  const { data: profile } = useProfile();
  return profile?.agents?.[0]?.id || '';
}

export function useWallet(agentId?: string) {
  return useQuery({
    queryKey: ['wallet', agentId],
    queryFn: () => fetchWallet(agentId!),
    enabled: !!agentId,
    staleTime: 1000 * 30,
  });
}

export function useServices(params?: { q?: string; category?: string }) {
  return useQuery({
    queryKey: ['services', params?.q, params?.category],
    queryFn: () => fetchServices(params),
    staleTime: 1000 * 60,
  });
}

export function useService(id?: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => fetchService(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useExecuteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goal: string) => executeGoal(goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
}

export function useTopup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agentId, amount }: { agentId: string; amount: number }) => fetchTopup(agentId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });
}
