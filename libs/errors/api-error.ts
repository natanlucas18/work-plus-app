export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly error: string,
    message: string,
    public readonly path?: string,
  ) {
    super(message);

    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
