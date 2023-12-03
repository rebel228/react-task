export interface UserFormData {
  username?: string;
  age?: number | string;
  email?: string;
  password?: string;
  gender?: string;
  terms?: boolean | string;
  image?: string | ArrayBuffer | null;
}

export interface RawUserFormsData {
  username: string;
  age: number;
  email: string;
  password: string;
  passwordrepeat: string;
  gender: string;
  terms: boolean | undefined;
  image: FileList;
}
