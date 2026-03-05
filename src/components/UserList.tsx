import type { UserDto } from "../types/UserDto";
import User from "./User";

interface UserListProps {
  users: UserDto[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      {users.map((u) => (
        <User key={u.id} user={u} />
      ))}
    </>
  );
};

export default UserList;
