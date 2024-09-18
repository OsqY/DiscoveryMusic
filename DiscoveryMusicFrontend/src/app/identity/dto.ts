export interface UserDto {
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  isEmailConfirmed: boolean;
}

export interface Role {
  $id: string;
  role: string;
}
