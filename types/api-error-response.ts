export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp: string;
  path: string;
}
