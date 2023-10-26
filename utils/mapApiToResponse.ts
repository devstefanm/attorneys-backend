export interface IApiResponse<T> {
  data?: T;
  error?: number;
  message?: string | string[];
}

const mapApiToResponse = <T>(
  statusCode: number = 200,
  message?: string | string[],
  data?: T,
): IApiResponse<T> => {
  if (statusCode >= 200 && statusCode < 300) {
    return { data, message };
  } else {
    return { error: statusCode, message };
  }
};

export default mapApiToResponse;
