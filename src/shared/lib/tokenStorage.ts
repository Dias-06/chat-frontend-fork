let accessToken: string | null = null;

export const tokenStorage = {
  get() {
    return accessToken;
  },
  set(token: string) {
    accessToken = token;
  },
  clear() {
    accessToken = null;
  },
};
