export type SendCodeRequest = {
  phone_number: string;
  code_len: number;
};

export type GetTokenRequest = {
  phone_number: string;
  code: string;
};

export type GetTokenResponse = {
  access: string;
  refresh: string;
};
