import { AuthResponse } from '@/types/auth-response';
import { ServerResponseDto } from '@/types/server-dto';
import { User } from '@/types/user';
import { create } from 'zustand';

export class SessionExpiredError extends Error {
  constructor() {
    super('Sua sessão expirou. Faça login novamente.');
    this.name = 'SessionExpiredError';
  }
}

type AuthState = {
  user: User | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setSession: (data: { user: User; expiresIn: number }) => void;
  logout: () => void;
  hydrateSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  expiresAt: null,
  isAuthenticated: false,
  isLoading: true,

  setSession: ({ user, expiresIn }) =>
    set({
      user,
      expiresAt: Date.now() + expiresIn * 1000,
      isAuthenticated: true,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      expiresAt: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  hydrateSession: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (res.status === 401) {
        set({
          user: null,
          expiresAt: null,
          isAuthenticated: false,
        });

        throw new SessionExpiredError();
      }

      if (!res.ok) {
        throw new Error(`Erro ao renovar sessão: ${res.status}`);
      }

      const response = (await res.json()) as ServerResponseDto<AuthResponse>;

      set({
        user: {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
        },
        expiresAt: Date.now() + response.data.auth.expiresIn * 1000,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
