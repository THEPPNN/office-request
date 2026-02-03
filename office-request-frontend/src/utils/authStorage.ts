const TOKEN_KEY = "office_request_token";
const ROLE_KEY = "office_request_role";
const ID_KEY = "office_request_id";

export const authStorage = {
  setAuth: (token: string, role: string, id: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(ID_KEY, id);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRole: () => localStorage.getItem(ROLE_KEY),
  getId: () => localStorage.getItem(ID_KEY),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(ID_KEY);
  },
};