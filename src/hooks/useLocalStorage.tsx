import { useState, useEffect } from 'react';

const useLocalStorage = <T extends {}>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {

  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const setValue = (value: T) => {
    setStoredValue(value);
  };

  const removeValue = () => {
    localStorage.removeItem(key);
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage