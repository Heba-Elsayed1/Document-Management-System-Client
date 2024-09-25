export interface RegisterDTO {
  FullName: string;
  UserName: string;
  Email: string;
  Password: string;
  PasswordConfirmed: string;  
  NID?: string;
  PhoneNumber?: string;
  Gender?: string;
  WorkspaceName: string;
}
