import { PathLinks } from '@/enums/path-links';
import { SessionExpiredError, useAuthStore } from '@/stores/auth-store';
import { ApiError } from './errors/api-error';
import { ApiErrorResponse } from '@/types/api-error-response';

let refreshPromise: Promise<void> | null = null;

async function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = useAuthStore
      .getState()
      .hydrateSession()
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

async function makeRequest(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (
    options.body &&
    !headers.has('Content-Type') &&
    !(options.body instanceof FormData)
  ) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    return await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    });
  } catch {
    throw new ApiError(
      0,
      'Network Error',
      'Não foi possível conectar ao servidor.',
    );
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    throw new ApiError(
      response.status,
      errorData?.error ?? 'Request Error',
      Array.isArray(errorData?.message)
        ? errorData.message.join(', ')
        : (errorData?.message ?? 'Ocorreu um erro inesperado.'),
      errorData?.path,
    );
  }

  return data as T;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  let response = await makeRequest(endpoint, options);

  if (response.status !== 401) {
    return handleResponse<T>(response);
  }

  try {
    await refreshSession();
  } catch (error) {
    if (error instanceof SessionExpiredError) {
      if (typeof window !== 'undefined') {
        window.location.href = PathLinks.SIGN_IN;
      }

      throw new ApiError(
        401,
        'Unauthorized',
        'Sua sessão expirou. Faça login novamente.',
      );
    }

    throw error;
  }

  response = await makeRequest(endpoint, options);

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = PathLinks.SIGN_IN;
    }

    throw new ApiError(
      401,
      'Unauthorized',
      'Sua sessão expirou. Faça login novamente.',
    );
  }

  return handleResponse<T>(response);
}
