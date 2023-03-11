import { useState, useEffect } from "react";

interface localStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export function getLocalStorageItem<T>(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
}

export function getTokenLocalStorageItem<T>(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
}

// export default useLocalStorage
