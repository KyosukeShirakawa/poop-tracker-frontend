import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface AuthUser {
  id: string;
  username: string;
}

export interface UserContextInterface {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
}

const defaultState = {
  user: {
    id: "0",
    username: "default user",
  },
  setUser: (user: AuthUser) => {},
} as UserContextInterface;

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
