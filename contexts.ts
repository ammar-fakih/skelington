import { createContext } from 'react';

interface AppDataContextInterface {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  useUserTheme: boolean;
  setUseUserTheme: (useUserTheme: boolean) => void;
}
export const AppDataContext = createContext<AppDataContextInterface | null>(
  null
);
