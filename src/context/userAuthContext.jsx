import { createContext, useContext } from "react";

export const UserAuthContext = createContext(null);

export function useUserAuth() {
    const ctx = useContext(UserAuthContext);
    if (!ctx) throw new Error("useUserAuth harus dipakai di dalam UserAuthProvider");
    return ctx;
}
