import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { UserDto } from "../types/UserDto";

export interface UserContextInterface {
  user: UserDto;
  setUser: Dispatch<SetStateAction<UserDto>>;
}

const defaultState = {
  user: {
    id: "1",
    name: "Kyo",
    logs: [],
    safeFoodList: [],
    avoidFoodList: [],
  },
  setUser: (user: UserDto) => {},
} as UserContextInterface;
export const UserContext = createContext<UserContextInterface>(defaultState);

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserDto>({
    id: "",
    name: "",
    logs: [],
    safeFoodList: [],
    avoidFoodList: [],
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
