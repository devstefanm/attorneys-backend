export interface ILoginApiResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  id: number;
  username: string;
  email: string;
  role_name: string;
}

export interface ILoggedUser extends IJwtPayload {
  password: string;
}

export interface IRegistrationPassword {
  password: string;
}
