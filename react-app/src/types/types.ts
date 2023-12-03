export interface UserFormData {
  username?: string;
  age?: number | string;
  email?: string;
  password?: string;
  gender?: string;
  terms?: boolean | string;
  image?: string | ArrayBuffer | null;
  country?: string;
}

export interface RawUserFormsData {
  username: string;
  age: number;
  email: string;
  password: string;
  passwordrepeat: string;
  gender: string;
  terms: boolean | undefined;
  country: string;
}

export interface RawUserFormsDataUnc extends RawUserFormsData {
  image: File;
}

export interface RawUserFormsDataCnt extends RawUserFormsData {
  image: FileList;
}
