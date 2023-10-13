// Path: condo-admin/app/hooks/users.ts
import { useRouter } from "next/navigation";

import mockData from "@/lib/mock_data.json";
import { selectUsers, useDispatch, useSelector, userSlice } from "@/lib/redux";
import { Users } from "../../types/users";

export const useUsers = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const loadUsers = () => {
    if (users.length > 0) return;
    dispatch(userSlice.actions.load(mockData));
  };

  const getUserById = (id: number) => {
    const user = users.filter((u) => u.id == id)[0];
    return user;
  };

  const addUser = (user: Users) => {
    dispatch(userSlice.actions.add({ ...user, id: users.length + 2 }));
  };

  const updateUser = (user: Users) => {
    const newUserList = users.map((u) => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    });

    dispatch(userSlice.actions.load(newUserList));
  };

  const deleteUser = (id: number) => {
    const newUsers = users.filter((u) => u.id !== id);

    dispatch(userSlice.actions.load(newUsers));
  };

  return {
    users,
    loadUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
  };
};
