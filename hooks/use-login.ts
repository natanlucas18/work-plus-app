import { ApiError } from '@/libs/errors/api-error';
import { appToast } from '@/libs/toast';
import { LoginService } from '@/services/login-service';
import { useAuthStore } from '@/stores/auth-store';
import { LoginForm } from '@/types/login-form';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginForm) => LoginService(data),

    onSuccess: (data) => {
      useAuthStore.getState().setSession({
        user: data.data.user,
        expiresIn: data.data.auth.expiresIn,
      });
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        appToast.error(error.message);
        return;
      }

      appToast.error('Ocorreu um erro inesperado.');
    },
  });
}
