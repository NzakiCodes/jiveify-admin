import { create } from "zustand";
import { persist, devtools, subscribeWithSelector } from "zustand/middleware";
import authenticateUser from "./authSlice";
import appStore from "./appStore";
import { App, AuthenticateUser, Theme } from "@/types";

export const useAuthStore = create<AuthenticateUser>()(
  devtools(
    persist(
      subscribeWithSelector((...auth) => ({
        ...authenticateUser(...auth),
      })),
      {
        name: "user-auth",
      }
    )
  )
);

export const useAppStore = create<App>()(
  devtools(
    subscribeWithSelector((...app) => ({
      ...appStore(...app),
    }))
  )
);
