export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  conditionsAccepted?: boolean | undefined;
  file?: FileList | undefined;
  country: string;
}
