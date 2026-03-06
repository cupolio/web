"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

/** 우측 상단 헤더에 표시할 이름 오버라이드 (이력서 기본정보 이름). /resume 페이지에서만 사용. */
type DisplayNameOverrideContextValue = {
  /** 특수문자 제외한 표시용 이름. null이면 기존 user metadata 사용 */
  displayNameOverride: string | null;
  setDisplayNameOverride: (name: string | null) => void;
};

const DisplayNameOverrideContext = createContext<DisplayNameOverrideContextValue | null>(null);

/** 표시 시 특수문자 제거 (한글·영문·숫자·공백만 허용) */
export function stripSpecialChars(name: string): string {
  return name.replace(/[^a-zA-Z0-9가-힣\s]/g, "").trim();
}

export function DisplayNameOverrideProvider({ children }: { children: ReactNode }) {
  const [displayNameOverride, setDisplayNameOverrideState] = useState<string | null>(null);
  const setDisplayNameOverride = useCallback((name: string | null) => {
    setDisplayNameOverrideState(name === "" ? null : name);
  }, []);

  return (
    <DisplayNameOverrideContext.Provider value={{ displayNameOverride, setDisplayNameOverride }}>
      {children}
    </DisplayNameOverrideContext.Provider>
  );
}

export function useDisplayNameOverride() {
  return useContext(DisplayNameOverrideContext);
}
