"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Role = "admin" | "user";

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  // TODO: ganti default value / sumber awal role ini kalau sudah ada auth
  // (misal baca dari session/cookie alih-alih hardcode "admin")
  const [role, setRole] = useState<Role>("admin");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole harus dipakai di dalam <RoleProvider>");
  }
  return context;
}
