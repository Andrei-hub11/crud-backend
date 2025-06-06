export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly data: T | null;
  public readonly message: string | null;

  private constructor(
    success: boolean,
    data: T | null,
    message: string | null
  ) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  public static ok<T>(data: T): ApiResponse<T> {
    return new ApiResponse(true, data, null);
  }

  public static created<T>(data: T): ApiResponse<T> {
    return new ApiResponse(true, data, null);
  }

  public static error<T>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(false, null, message);
  }
}
