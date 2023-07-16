import { StateCreator } from "zustand";
import { AuthenticateUser } from "@/types";
/**
 * Sets authenticate user
 * @param set
 * @param get
 */
const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
};
const authenticateUser: StateCreator<AuthenticateUser> = (set, get) => ({
  ...initialState,
  setUser(user) {
    set(() => ({
      user: user,
    }));
  },
  setToken(token) {
    set(() => ({
      token: token,
      isLoggedIn: true,
    }));
  },
  logout() {
    set(() => ({ user: null, isLoggedIn: false, token: null }));
  },
});
export default authenticateUser;
