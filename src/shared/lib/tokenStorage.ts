export const tokenStorage = {
  getAccess() {
    return localStorage.getItem("access");
  },

  getRefresh() {
    return localStorage.getItem("refresh");
  },

  setTokens(access: string, refresh: string) {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  },

  clear() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
};
