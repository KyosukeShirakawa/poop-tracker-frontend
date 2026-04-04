import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Food } from "../types/Food";
import { getSafeFoods } from "../services/user.service";

interface AuthUser {
  id: string;
  username: string;
}

export interface UserContextInterface {
  user: AuthUser | null;
  safeFoods: Food[];
  setSafeFoods: Dispatch<SetStateAction<Food[]>>;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
}

const defaultState = {
  user: {
    id: "0",
    username: "default user",
  },
  safeFoods: [],
  setSafeFoods: () => [],
  setUser: (user: AuthUser) => {},
} as UserContextInterface;

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [safeFoods, setSafeFoods] = useState<Food[]>([]);
  useEffect(() => {
    if (user) {
      getSafeFoods(user.id).then(setSafeFoods);
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, safeFoods, setSafeFoods }}>
      {children}
    </UserContext.Provider>
  );
};
