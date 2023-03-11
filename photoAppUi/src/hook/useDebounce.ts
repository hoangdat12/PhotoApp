import { useState, useEffect } from "react";

const useDebounce = <T>(value: T) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), 800);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
