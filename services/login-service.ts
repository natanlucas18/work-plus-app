import { apiFetch } from '@/libs/api-client';
import { LoginForm } from '@/types/login-form';
import { LoginResponse } from '@/types/login-response';
import { ServerResponseDto } from '@/types/server-dto';

export function LoginService(data: LoginForm) {
  return apiFetch<ServerResponseDto<LoginResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}
